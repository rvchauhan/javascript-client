import React from 'react';
import PropTypes from 'prop-types';
import { Input, P } from './index';


const TextField = (props) => {
  const {
    onChange, value, heading, label, onBlur, error,
  } = props;
  return (
    <div>
      <p><b>{heading}</b></p>
      <Input type="text" onChange={onChange} value={value} label={label} onBlur={onBlur} />
      <P>
        {error}
      </P>
    </div>
  );
};

TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  heading: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  error: '',
  label: '',
};

export default TextField;
