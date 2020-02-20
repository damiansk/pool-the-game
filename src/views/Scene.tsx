import React from 'react';
import { useThree } from 'react-three-fiber';
import { PoolTable, PoolBall } from '../components';
import { Provider } from '../hooks';
import { Light } from '../components/Light';

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
  const { camera  } = useThree() as { camera: THREE.PerspectiveCamera };

  camera.fov = 45;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.near = 0.1;
  camera.far = 1000;

  camera.up.set(0, 0, 1);
  camera.position.set(-25, 17, 25);

  return (
    <>
      <Light
        args={[0xffffff]}
        type="AmbientLight"
        intensity={0.2}
        position={[0, 0, 0]}
      />
      {[[-5, -12, 20], [5, -12, 20], [-5, 12, 20], [5, 12, 20]].map((pos, index) => (
        <Light
          args={[0xffffff]}
          key={index}
          type='PointLight'
          intensity={0.4}
          distance={100}
          position={pos}
          castShadow
        />
      ))}

      <Provider>
        <PoolTable />
        {ballStartPositions.map((position, index) =>
          <PoolBall key={index} position={position} textureURL={index} />)}
      </Provider>
    </>
  );
}

export { Scene };
