import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './index';


const TextField = (props) => {
  const { onChange, value, heading, label } = props;
  return (
    <div>
      <p><b>{heading}</b></p>
      <Input type="text" onChange={onChange} value={value} label={label} />
    </div>
  );
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
