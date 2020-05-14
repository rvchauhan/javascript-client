
import React from 'react';
import PropTypes from 'prop-types';
import Select, { P } from './style';

const SelectField = (props) => {
  // console.log('inside select field', props);
  const {
    options, defaultOption, onChange, values, error, heading, onBlur,
  } = props;
  return (
    <>
      <p><b>{heading}</b></p>
      <Select value={values} onChange={onChange} onBlur={onBlur}>
        {defaultOption && <option>{defaultOption}</option>}
        {
          options && options.length && options.map(({ value, label }) => {
            return (
              <option key={label} value={value} onChange={(event) => onChange(event)}>
                {label}
              </option>
            );
          })
        }
      </Select>
      <P>
        {error}
      </P>
    </>
  );
};

SelectField.propTypes = {
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};
SelectField.defaultProps = {
  error: '',
};
export default SelectField;
