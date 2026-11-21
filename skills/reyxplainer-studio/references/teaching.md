# Teaching method
- For bugs and risks, consider a consequence-first hook: show or state the concrete failure, then ask how it happens and rewind to the normal mechanism. Explain why the viewer should care before spending time on terminology.
- Calibrate the consequence. Say a buffer overflow *can* corrupt nearby memory or crash; say exploitation depends on the program, input control and mitigations. Never imply every overflow gives an attacker code execution.
- Start with a concrete object or behavior, not a dictionary definition. Establish what normal looks like before showing the edge case.
- Change one variable at a time. Use a stable visual anchor so learners can infer cause and effect.
- Reveal intermediate states. Narration should explain why, not merely read labels.
- End with a transferable takeaway and, where helpful, a defense or a one-question prediction. Never claim mastery of exploitation from a short clip.
- The sequence is a toolkit, not a rigid template: compare, simulate, trace, predict, or reconstruct depending on the topic.
- Use audience-specific prerequisites; define jargon only before it is needed.
