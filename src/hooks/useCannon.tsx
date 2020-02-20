import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { useFrame } from 'react-three-fiber';
import * as CANNON from 'cannon';



const ballMaterial = new CANNON.Material('ballMaterial');
const topMaterial = new CANNON.Material('topMaterial');
const sideMaterial = new CANNON.Material('sideMaterial');

const materials = {
  ball: ballMaterial,
  top: topMaterial,
  side: sideMaterial,
};

type Materials = typeof materials;

const cannonContext = createContext<CANNON.World>(null!);

const Provider: React.FC<{}> = ({ children }) => {
  const [world] = useState<CANNON.World>(() => new CANNON.World());

  useEffect(() => {
    // TODO Check what it is doing
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.gravity.set(0, 0, -9.8);
    world.defaultContactMaterial.contactEquationStiffness = 1e11; // Contact stiffness - use to make softer/harder contacts
    world.defaultContactMaterial.contactEquationRelaxation = 2; // Stabilization time in number of timesteps

    world.defaultContactMaterial.friction = 0.1;
    world.defaultContactMaterial.restitution = 0.85;

    const ballTopMaterial = new CANNON.ContactMaterial(ballMaterial, topMaterial, { friction: 0.7, restitution: 0.1 });
    const ballSideMaterial = new CANNON.ContactMaterial(ballMaterial, sideMaterial, { friction: 0.5, restitution: 0.9 });

    world.addContactMaterial(ballTopMaterial);
    world.addContactMaterial(ballSideMaterial);
  }, [world]);

  useFrame(() => world.step(1/60));
 
  return <cannonContext.Provider value={world} children={children} />;
}




const useCannon = (
  props: CANNON.IBodyOptions,
  fn: (body: CANNON.Body, materials: Materials) => void,
  deps: Array<any> = []
): React.MutableRefObject<THREE.Mesh> => {
  // TODO Use generic type?
  const ref = useRef<THREE.Mesh>(null!);
  const world = useContext(cannonContext);

  const [body] = useState(() => new CANNON.Body(props));

  useEffect(() => {
    fn(body, materials);
    world.addBody(body);

    return () => world.remove(body);
  }, deps);

  useFrame(() => {
    ref.current?.position.copy(body.position as unknown as THREE.Vector3);
    ref.current?.quaternion.copy(body.quaternion as unknown as THREE.Quaternion);
  });

  return ref;
}

export { cannonContext, Provider, useCannon };