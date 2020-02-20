import React, { useMemo } from 'react';
import * as CANNON from 'cannon';
import { TextureLoader, SphereGeometry } from 'three';
import { useCannon } from '../hooks';

const bumpForce = 30;
const mass = 0.170;
const damping = 0.5;
const sleepSpeedLimit = 0.5;
const sleepTimeLimit = 0.1;
const radius = 0.5;

const geometry = new SphereGeometry(radius, 128, 128);

const PoolBall: React.FC<{ textureURL: string | number, position: number[] }> =
  ({ textureURL, position, ...restProps }) => {
    const texture = useMemo(() =>
      new TextureLoader().load(`./assets/balls/${textureURL}.png`), [textureURL]);

    const ref = useCannon({ mass: mass }, (body, materials) => {
      body.linearDamping = body.angularDamping = damping;
      body.allowSleep = true;
      body.sleepSpeedLimit = sleepSpeedLimit;
      body.sleepTimeLimit = sleepTimeLimit;

      body.addShape(new CANNON.Sphere(radius));
      body.position.set(position[0], position[1], position[2] + 10);

      body.material = materials.ball;

      if(textureURL === 0) {
        setTimeout(() => {
          const worldPoint = new CANNON.Vec3(0,0,0);
          const force = new CANNON.Vec3(0, bumpForce, 0);
          body.applyLocalImpulse(force, worldPoint);
        }, 4000);
      }
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
