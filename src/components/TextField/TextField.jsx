import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './index';


const TextField = (props) => {
  const { onChange, value, onBlur } = props;
  return <Input type="text" onChange={onChange} value={value} onBlur={onBlur} />;
};

TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
