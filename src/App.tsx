import React from 'react';
import { Canvas } from 'react-three-fiber'
import { Scene } from './views';
import { Controls } from './components';

const App: React.FC<{}> = () => (
  <Canvas>
    <Scene />
    <Controls />
  </Canvas>
);

export default App;
