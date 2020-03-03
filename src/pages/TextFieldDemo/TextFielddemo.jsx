import * as React from 'react';
import TextField from '../../components/TextField/TextField';
import { Text } from '../../components/index';

function TextFieldDemo() {
  return (
    <div>
      <Text>
        <p>This is disabled input</p>
      </Text>
      <TextField value="Disabled input" disabled />
      <Text>
        <p>A valid input</p>
      </Text>
      <TextField value="Accessible" />
      <Text>
        <p>An input with error</p>
      </Text>
      <TextField value="101" error="Could not be greater than" />
    </div>
  );
}

export default TextFieldDemo;
