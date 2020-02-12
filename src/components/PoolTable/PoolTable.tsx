import React, { useMemo } from 'react';
import {
  TextureLoader,
  RepeatWrapping,
  Object3D
} from 'three';
import { ReactThreeFiber } from 'react-three-fiber';
import playAreaTextureURL from '../../assets/cloth.jpg';
import { Edge } from './WoodenEdge';
import { Pocket } from './Pocket';
import { Cloth } from './Cloth';
import { Top } from './Top';
import {
  pocketPositions,
  edgeSidePositions,
  edgeTopPositions,
  clothSidePositions,
  clothTopPositions,
} from './positions';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      object3D: ReactThreeFiber.Object3DNode<Object3D, typeof Object3D>
    }
  }
}

const PoolTable: React.FC<{}> =
  () => {
    const texture = useMemo(() => {
      const textureLoader = new TextureLoader().load(playAreaTextureURL)
      textureLoader.wrapS = RepeatWrapping;
      textureLoader.wrapT = RepeatWrapping;
      textureLoader.offset.set(0, 0);
      textureLoader.repeat.set(3, 6);

      return textureLoader;
    }, []);


    return (
      <object3D position={[0, 0, -1]}>
        <Top texture={texture}/>

        {edgeSidePositions.map((pos, i) => 
          <Edge key={i} position={pos} />)}
        {edgeTopPositions.map((pos, i) => 
          <Edge key={i} position={pos} isRotated />)}

        {pocketPositions.map((pos, i) =>
          <Pocket key={i} position={pos} />)}

        {clothSidePositions.map((pos, i) =>
          <Cloth
            key={i}
            texture={texture}
            position={pos}
            rotation-y={i === 1 || i === 3 ? Math.PI : undefined}
          />)}
        {clothTopPositions.map((pos, i) =>
          <Cloth
            key={i}
            texture={texture}
            position={pos}
            rotation-z={i === 0 ? -Math.PI/2 : Math.PI/2}
          />)}
      </object3D>
    );
  }

export { PoolTable };