import React from 'react';
import PropTypes, { string } from 'prop-types';

const button = (props) => {
  const { color, disabled, style, value, onClick } = props;
  return (

  );
}

button.PropTypes = {
  color: PropTypes.color,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

button.defaultProps  = {
  color: 'default',
  disabled: false,
  style: {},
}
