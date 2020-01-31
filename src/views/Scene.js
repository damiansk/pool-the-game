import React from 'react';

const Scene = () => (
  <mesh>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <meshNormalMaterial attach="material" />
  </mesh>
);

export { Scene };
