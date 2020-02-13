import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { useFrame } from 'react-three-fiber';
import * as CANNON from 'cannon';


const cannonContext = createContext<CANNON.World>(null!);

const Provider: React.FC<{}> = ({ children }) => {
  const [world] = useState<CANNON.World>(() => new CANNON.World());

  useEffect(() => {
    // TODO Check what it is doing
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.gravity.set(0, 0, -10);
    world.defaultContactMaterial.contactEquationStiffness = 1e11; // Contact stiffness - use to make softer/harder contacts
    world.defaultContactMaterial.contactEquationRelaxation = 2; // Stabilization time in number of timesteps
  }, [world]);

  useFrame(() => world.step(1/60));
 
  return <cannonContext.Provider value={world} children={children} />;
}

const useCannon = (
  props: CANNON.IBodyOptions,
  fn: (body: CANNON.Body) => void,
  deps: Array<any> = []
): React.Ref<THREE.Object3D> => {
  // TODO Use generic type
  const ref = useRef<THREE.Object3D>(null);
  const world = useContext(cannonContext);

  const [body] = useState(() => new CANNON.Body(props));

  useEffect(() => {
    fn(body);
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