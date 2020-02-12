import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { useRender } from 'react-three-fiber';
import * as CANNON from 'cannon';


const cannonContext = createContext();

const Provider = ({ children }) => {
  const [world] = useState(() => new CANNON.World());

  useEffect(() => {
    // TODO Check what it is doing
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.gravity.set(0, -10, 0);
  }, [world]);

  useRender(() => world.step(1/60));
 
  return <cannonContext.Provider value={world} children={children} />
}

const useCannon = (props, fn, deps = []) => {
  const ref = useRef();
  const world = useContext(cannonContext);

  const [body] = useState(() => new CANNON.Body(props));

  useEffect(() => {
    fn(body);
    world.add(body);

    return () => world.removeBody(body);
  }, deps);

  useRender(() => {
    if(ref.current) {
      ref.current.position.copy(body.position);
      ref.current.quaternion.copy(body.quaternion);
    }
  });

  return ref;
}

export { cannonContext, Provider, useCannon };