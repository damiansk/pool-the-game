import React from 'react';
import PropTypes from 'prop-types';

const Light = ({ type: LightType, ...restProps}) => {
  return <LightType {...restProps} />
}

Light.defaultProps = {
  type: '',
}

Light.propTypes = {
  type: PropTypes.string,
}

export { Light };
