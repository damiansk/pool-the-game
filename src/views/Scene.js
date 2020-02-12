import React from 'react';
import { useThree } from 'react-three-fiber';
import { Light, PoolTable, PoolBall } from '../components';

const ballStartPositions = [
  [0, -16, 0],
  [-1.01, 15, 0],
  [1.01, 17, 0],
  [-0.51, 16, 0],
  [-1.01, 17, 0],
  [-2.02, 17, 0],
  [1.53, 16, 0],
  [0.51, 14, 0],
  [0, 15, 0],
  [0, 13, 0],
  [0.51, 16, 0],
  [2.02, 17, 0],
  [-0.51, 14, 0],
  [0, 17, 0],
  [-1.53, 16, 0],
  [1.01, 15, 0],
];

const Scene = () => {
  const { camera } = useThree();

  camera.fov = 45;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.near = 0.1;
  camera.far = 1000;

  camera.up.set(0, 0, 1);
  camera.position.set(-5, 7, 5);

  return (
    <>
      <Light
        type="AmbientLight"
        color={0xffffff}
        intensity={0.2}
        position={[0, 0, 0]}
      />
      {[[-5, -12, 20], [5, -12, 20], [-5, 12, 20], [5, 12, 20]].map((pos, index) => (
        <Light
          key={index}
          type='PointLight'
          color={0xffffff}
          intensity={0.4}
          distance={100}
          position={pos}
          castShadow
        />
      ))}
      <PoolTable />

      {ballStartPositions.map((position, index) =>
        <PoolBall key={index} position={position} textureURL={index} />)}
    </>
  );
}

export { Scene };
