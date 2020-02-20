import React from 'react';
import { BoxGeometry, Vector3 } from 'three';
import * as CANNON from 'cannon';
import { useCannon } from '../../hooks';

const mass = 0;

const geometry = new BoxGeometry(24, 48, 1);
const position = new Vector3(0, 0, 0);

const Top: React.FC<{ texture: THREE.Texture }> =
  ({ texture }) => {
    const ref = useCannon({ mass: mass }, (body, materials) => {
      const shape = new CANNON.Plane();
      body.addShape(shape);
      body.position.set(position.x, position.y, position.z);

      body.material = materials.top;
    });

    return (
      <mesh args={[geometry]} ref={ref} receiveShadow>
        <meshStandardMaterial
          attach='material'
          map={texture}
          color={0x42a8ff}
          roughness={0.4}
          metalness={0}
          bumpScale={1}
        />
        </mesh>
    );
  }

export { Top };
