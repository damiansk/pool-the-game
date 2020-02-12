import React from 'react';
import {
  CylinderGeometry,
  MeshBasicMaterial,
} from 'three';

const geometry = new CylinderGeometry(1, 1, 1.4, 20);
const material = new MeshBasicMaterial({ color: 0x000000 });

const Pocket: React.FC<{ position: THREE.Vector3 | number[] }> =
  ({ position }) => (
    <mesh
      args={[geometry, material]}
      position={position}
      rotation={[Math.PI/2, 0, 0]}
    />
  );

export { Pocket };
