import React from 'react';
import { Canvas } from 'react-three-fiber'
import { Scene } from './views';
import { Controls } from './components';

function App() {
  return (
    <Canvas>
      <Scene />
      <Controls />
    </Canvas>
  );
}

export default App;
