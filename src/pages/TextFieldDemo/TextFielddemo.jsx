import * as React from 'react';
import TextField from '../../components/TextField/TextField';
import { Text } from '../../components/index';
import Slider from '../../components/Slider/Slider';
import { banners } from '../../config/constant';

function TextFieldDemo() {
  return (
    <div>
      <Slider altText="Default Banner" banners={banners} duration={2000} height={200} random={false} />
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
