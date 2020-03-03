import React from 'react';
import { Input, P } from './index';

function TextField({ value = '', disabled = '', error = '' }) {
  return (
    <>
      <Input type="text" value={value} disabled={disabled} />
      <P>
        {error}
      </P>
    </>
  );
}
export default TextField;
