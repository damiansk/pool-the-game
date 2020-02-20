import React from 'react';
import * as CANNON from 'cannon';
import { 
  Shape,
  ExtrudeGeometry,
} from 'three';
import { useCannon } from '../../hooks';

const shape = new Shape();
shape.moveTo(0, 0);
shape.lineTo(0, 22);
shape.lineTo(0.5, 21.2);
shape.lineTo(0.5, 0.8);
shape.lineTo(0, 0);

const extrudeSettings: THREE.ExtrudeGeometryOptions =
  { steps: 1, depth: 1, bevelEnabled: false };
const geometry = new ExtrudeGeometry(shape, extrudeSettings);

const cannonShape = new CANNON.ConvexPolyhedron(
  geometry.vertices.map(vertex => new CANNON.Vec3(vertex.x, vertex.y, vertex.z)),
  // TODO Rise a PR with fix? https://github.com/DefinitelyTyped/DefinitelyTyped#how-can-i-contribute
  geometry.faces.map(face => [face.a, face.b, face.c] as unknown as number)
);

const Cloth: React.FC<{ texture: THREE.Texture, position: number[], quaternion: THREE.Quaternion }> =
  ({ texture, position, quaternion, ...restProps }) => {
    const ref = useCannon({ mass: 0 }, (body, materials) => {
      body.addShape(cannonShape);
      body.position.set(position[0], position[1], position[2]);
      body.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);

      body.material = materials.side;
    });

    return (
      <mesh
        ref={ref}
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
