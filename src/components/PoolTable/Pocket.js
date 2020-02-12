import React from 'react';
import {
  CylinderGeometry,
  MeshBasicMaterial,
} from 'three';

const geometry = new CylinderGeometry(1, 1, 1.4, 20);
const material = new MeshBasicMaterial({ color: 0x000000 });

const Pocket = ({ position }) => {
  return (
    <mesh
      args={[geometry, material]}
      position={position}
      rotation={[Math.PI/2, 0, 0]}
    />
  )
}

export { Pocket };
