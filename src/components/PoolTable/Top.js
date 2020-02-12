import React from 'react';
import { BoxGeometry } from 'three';

const geometry = new BoxGeometry(24, 48, 1);

const Top = ({ texture }) => {
  return (
    <mesh args={[geometry]} receiveShadow>
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
