import React from 'react';
import {
  TextureLoader,
  MeshStandardMaterial,
} from 'three';

import edgeTextureUrl from '../../assets/hardwood_floor.jpg';
const texture = new TextureLoader().load(edgeTextureUrl);
const material = new MeshStandardMaterial({ map: texture });

const Edge: React.FC<{ position: THREE.Vector3 | number[], isRotated?: boolean }> =
  ({ position, isRotated }) => {
    return  (
      <mesh args={[undefined, material]} position={position}>
        <boxGeometry attach="geometry" args={isRotated ? [22, 1, 1] : [1, 22, 1]} />
      </mesh>
    );
  }

export { Edge };
