import React from 'react';
import { 
  Shape,
  ExtrudeGeometry,
} from 'three';

const shape = new Shape();
shape.moveTo(0, 0);
shape.lineTo(0, 22);
shape.lineTo(0.5, 21.2);
shape.lineTo(0.5, 0.8);
shape.lineTo(0, 0);

const extrudeSettings = { steps: 1, depth: 1, bevelEnabled: false };
const geometry = new ExtrudeGeometry(shape, extrudeSettings);

const Cloth = ({ texture, ...restProps }) => {
  return (
    <mesh
      args={[geometry]}
      {...restProps}
    >
      <meshStandardMaterial
        attach="material"
        map={texture}
        color={0x42a8ff}
        roughness={0.4}
        metalness={0}
        bumpScale={1}
      />
    </mesh>
  );
}

export { Cloth };
