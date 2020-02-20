import React from 'react';

type LightProps =
  { type: string } &
  JSX.IntrinsicElements['pointLight'] &
  JSX.IntrinsicElements['ambientLight'];

const Light = ({ type, ...restProps}: LightProps) => {
  const LightType = type;

  return <LightType {...restProps } />
}

export { Light };
