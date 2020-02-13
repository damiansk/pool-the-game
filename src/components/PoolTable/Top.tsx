import React from 'react';
import { BoxGeometry, Vector3 } from 'three';
import * as CANNON from 'cannon';
import { useCannon } from '../../hooks';

const geometry = new BoxGeometry(24, 48, 1);
const position = new Vector3(0, 0, 0);

const Top: React.FC<{ texture: THREE.Texture }> =
  ({ texture }) => {
    const ref = useCannon({ mass: 0, material: new CANNON.Material('Plane') }, body => {
      body.addShape(new CANNON.Plane());
      body.position.set(position.x, position.y, position.z);
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
