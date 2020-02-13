import React from 'react';

type LightProps = {
  type: string;
}

const Light = ({ type: LightType, ...restProps}: LightProps) => {
  return <LightType {...restProps} />
}

export { Light };
