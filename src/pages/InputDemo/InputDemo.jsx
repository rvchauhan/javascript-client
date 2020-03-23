import React from 'react';
import TextField from '../../components/TextField/TextField';
import SelectField from '../../components/SelectField/selectField';
import RadioGroup from '../../components/RadioGroup/radioGroup';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../config/constant';


class InputDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sport: '',
      position: '',
    };
  }

  onChangeTextField = (event) => {
    this.setState({ name: event.target.value });
  }

  onChangeSelectOptions = (event) => {
    let { position, sport } = this.state;
    const sportvalue = event.target.value;
    this.setState({
      sport: sportvalue === 'Select' ? '' : sportvalue,
      position: '',
    });
  }

  onChangeRadioOption = (event) => {
    let { position } = this.state;
    this.setState({ position: event.target.value });
  }


  getRadioOptions = () => {
    const { sport } = this.state;

    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  render() {
    const { sport, name, position } = this.state;
    console.log(this.state);
    return (
      <>
        <TextField onChange={this.onChangeTextField} value={name} heading="Name" label="Name" />
        <SelectField defaultOption="Select" options={selectOptions} onChange={this.onChangeSelectOptions} value={sport} heading="Select Your Game You Play?" />

        {
          sport && (
            <>
              <RadioGroup options={this.getRadioOptions()} onChange={this.onChangeRadioOption} value={position} heading="What you do ?" />
            </>
          )
        }
      </>
    );
  }
}

export default InputDemo;
