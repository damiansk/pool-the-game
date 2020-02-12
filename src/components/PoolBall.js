import React, { useMemo } from 'react';
import { TextureLoader, SphereGeometry } from 'three';

const geometry = new SphereGeometry(0.5, 128, 128);

const PoolBall = ({ textureURL, ...restProps }) => {
  const texture = useMemo(() =>
    new TextureLoader().load(`./assets/balls/${textureURL}.png`), [textureURL]);
  return (
    <mesh
      args={[geometry]}
      {...restProps}
      castShadow
    >
      <meshStandardMaterial
        attach='material'
        color={0xffffff}
        roughness={0.25}
        metalness={0}
        map={texture}
      />
    </mesh>
  )
};

export { PoolBall };
