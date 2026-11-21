import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {Explainer, Episode} from './Explainer';
import demo from './episode.json';
const episode=demo as Episode;
const Root=()=> <Composition id="Reyxplainer" component={Explainer} defaultProps={episode} durationInFrames={episode.scenes.reduce((a,s)=>a+s.frames,0)} fps={episode.fps} width={episode.width} height={episode.height} calculateMetadata={({props})=>({durationInFrames:props.scenes.reduce((a,s)=>a+s.frames,0),fps:props.fps,width:props.width,height:props.height})}/>;
registerRoot(Root);
