import React, { useMemo, useContext } from 'react';
import * as CANNON from 'cannon';
import { TextureLoader, SphereGeometry } from 'three';
import { useCannon, cannonContext } from '../hooks';

const radius = 0.5;
const geometry = new SphereGeometry(radius, 128, 128);

const PoolBall: React.FC<{ textureURL: string | number, position: number[] }> =
  ({ textureURL, position, ...restProps }) => {
    const texture = useMemo(() =>
      new TextureLoader().load(`./assets/balls/${textureURL}.png`), [textureURL]);

    const ref = useCannon({ mass: 100000, material: new CANNON.Material('ball') }, body => {
      body.addShape(new CANNON.Sphere(radius));
      body.position.set(position[0], position[1], position[2] + 10);
    });

    return (
      <mesh
        args={[geometry]}
        {...restProps}
        ref={ref}
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
