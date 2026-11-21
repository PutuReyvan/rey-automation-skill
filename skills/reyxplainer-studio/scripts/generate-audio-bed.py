"""Create original, low-key electronic backing music and synced micro SFX."""
from pathlib import Path
import numpy as np
from scipy.io.wavfile import write

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SR = 48000
DURATION = 45.0
N = int(SR * DURATION)
t = np.arange(N, dtype=np.float64) / SR


def write_stereo(name: str, mono: np.ndarray) -> None:
    stereo = np.column_stack((mono, mono))
    pcm = np.int16(np.clip(stereo, -1, 1) * 32767)
    write(PUBLIC / name, SR, pcm)


# Soft, slow-moving minor-to-major chord bed, with a quiet rhythmic pulse.
music = np.zeros(N, dtype=np.float64)
chords = [
    (55.00, 82.41, 110.00, 164.81),
    (65.41, 98.00, 130.81, 196.00),
    (49.00, 73.42, 98.00, 146.83),
    (73.42, 110.00, 146.83, 220.00),
    (55.00, 82.41, 110.00, 164.81),
    (65.41, 98.00, 130.81, 196.00),
]
for start in range(0, 48, 8):
    end = min(DURATION, start + 8.0)
    ix = (t >= start) & (t < end)
    local = t[ix] - start
    fade = np.minimum(1, local / 1.2) * np.minimum(1, (end - t[ix]) / 1.4)
    for j, hz in enumerate(chords[(start // 8) % len(chords)]):
        phase = (start * 0.23 + j * 0.71)
        voice = np.sin(2 * np.pi * hz * t[ix] + phase)
        overtone = 0.22 * np.sin(2 * np.pi * hz * 2.003 * t[ix] + phase)
        music[ix] += (voice + overtone) * fade * (0.018 / (j + 1))

# Gentle heartbeat-like low pulse every two seconds; ducked under the voice.
pulse = np.zeros(N, dtype=np.float64)
for start in np.arange(0.4, DURATION, 2.0):
    ix = (t >= start) & (t < start + 0.36)
    tau = t[ix] - start
    pulse[ix] += np.sin(2 * np.pi * 58 * tau) * np.exp(-tau * 10) * 0.025
music += pulse
music *= np.minimum(1, t / 1.2) * np.minimum(1, (DURATION - t) / 1.5)
write_stereo("music-bed.wav", music)

# Discrete synthetic blips/sweeps emphasize visual events without masking speech.
sfx = np.zeros(N, dtype=np.float64)


def blip(start: float, freq: float = 1100, duration: float = 0.075, amp: float = 0.10) -> None:
    i0, i1 = int(start * SR), min(N, int((start + duration) * SR))
    tau = np.arange(i1 - i0) / SR
    env = np.exp(-tau * 34) * np.minimum(1, tau * 180)
    sweep = freq * (1 - 0.18 * tau / duration)
    phase = 2 * np.pi * np.cumsum(sweep) / SR
    sfx[i0:i1] += amp * env * (np.sin(phase) + 0.18 * np.sin(phase * 2.01))


def thump(start: float, duration: float = 0.42, amp: float = 0.19) -> None:
    i0, i1 = int(start * SR), min(N, int((start + duration) * SR))
    tau = np.arange(i1 - i0) / SR
    freq = 92 - 48 * np.minimum(1, tau / duration)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    env = np.exp(-tau * 8) * np.minimum(1, tau * 90)
    sfx[i0:i1] += amp * env * np.sin(phase)


def sweep(start: float, duration: float = 0.6, amp: float = 0.045) -> None:
    i0, i1 = int(start * SR), min(N, int((start + duration) * SR))
    tau = np.arange(i1 - i0) / SR
    noise = np.random.default_rng(17 + int(start * 10)).standard_normal(len(tau))
    smooth = np.convolve(noise, np.ones(19) / 19, mode="same")
    env = np.sin(np.pi * np.minimum(1, tau / duration)) ** 2
    sfx[i0:i1] += amp * smooth * env


for when in (0.45, 7.72, 8.64, 8.92, 9.52, 12.53, 19.53, 20.64,
             28.84, 30.88, 32.20, 33.28, 34.50, 37.84, 43.14):
    blip(when, 950 if when not in (19.53, 20.64, 32.20) else 620)
thump(19.53, amp=0.13)  # Boundary reveal.
thump(32.20, duration=0.28, amp=0.10)  # Rejection beat.
sweep(12.2, 0.5, 0.026)
sweep(23.35, 0.75, 0.031)  # Brief data-corruption glitch texture.
sweep(38.5, 0.65, 0.022)
sfx *= np.minimum(1, t / 0.05) * np.minimum(1, (DURATION - t) / 0.4)
write_stereo("sfx-track.wav", sfx)
print(f"Generated {PUBLIC / 'music-bed.wav'} and {PUBLIC / 'sfx-track.wav'} ({SR} Hz stereo, {DURATION:.0f}s)")
