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
      cricket: '',
      football: '',
    };
  }

  onChangeTextField = (event) => {
    this.setState({ name: event.target.value });
  }

  onChangeSelectOptions = (event) => {
    let { cricket, football } = this.state;
    cricket = '';
    football = '';
    this.setState({ sport: event.target.value, cricket, football });
  }

  onChangeRadioOption = (event) => {
    let { cricket, football } = this.state;
    const { sport } = this.state;
    if (sport === 'football') {
      cricket = '';
      this.setState({ football: event.target.value, cricket });
    } else if (sport === 'cricket') {
      cricket = event.target.value;
      football = '';
      this.setState({ cricket: event.target.value, football });
    }
  }

  getRadioOptions = () => {
    const { sport } = this.state;

    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  render() {
    const { sport, name, cricket } = this.state;

    return (
      <>
        <p><b>Name</b></p>
        <TextField onChange={this.onChangeTextField} value={name} />

        <p><b>Select Your Game You Play?</b></p>
        <SelectField defaultOption="Select" options={selectOptions} onChange={this.onChangeSelectOptions} value={sport} />

        {
          sport && (sport === 'cricket' || sport === 'football') && (
            <>
              <p><b>What you do ?</b></p>
              <RadioGroup options={this.getRadioOptions()} onChange={this.onChangeRadioOption} value={cricket} />
            </>
          )
        }
      </>
    );
  }
}

export default InputDemo;
