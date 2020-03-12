import React from 'react';
import * as yup from 'yup';
import TextField from '../../components/TextField/TextField';
import SelectField from '../../components/SelectField/selectField';
import { RadioGroup } from '../../components/RadioGroup/index';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../config/constant';
import { Button } from '../../components/Button/index';


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.schema = yup.object().shape({
      name: yup.string().required('Please Enter your Name').min(3, 'Please enter no less than 3 characters'),
      sport: yup.string().required('Please select a sport'),
      football: yup.string().when('sport', {
        is: 'football',
        then: yup.string().required('Select option'),
      }),
      cricket: yup.string().when('sport', {
        is: 'cricket',
        then: yup.string().required('Select option'),
      }),
    });
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  onChangeTextField = (event) => {
    this.setState({ name: event.target.value });
  }

  onChangeSelectOptions = (event) => {
    let { sport, cricket, football } = this.state;
    sport = event.target.value;
    if (sport === 'select') {
      sport = '';
    }
    cricket = '';
    football = '';
    this.setState({ sport, cricket, football });
  }

  onChangeRadioOption = (event) => {
    let { cricket, football, sport } = this.state;
    console.log('______--', event.target.value);
    if (sport === 'football') {
      cricket = '';
      this.setState({ football: event.target.value, cricket });
    } else if (sport === 'cricket') {
      cricket = event.target.value;
      football = '';
      this.setState({ sport, cricket, football });
    }
  }

  getRadioOptions = () => {
    const { sport } = this.state;

    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getErrors = (field) => {
    if (this.state.touched[field] && this.hasErrors) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
  };

  render() {
    console.log(this.state);
    const { sport, name } = this.state;
    return (
      <form>
        <p><b>Name</b></p>
        <TextField
          onChange={this.onChangeTextField}
          value={name}
          error={this.getErrors('name')}
          onBlur={() => this.isTouched('name')}
        />

        <p><b>Select Your Game You Play?</b></p>
        <SelectField
          defaultOption="select"
          options={selectOptions}
          onChange={this.onChangeSelectOptions}
          values={sport}
          error={this.getErrors('sport')}
          onBlur={() => this.isTouched('sport')}
        />

        {
          sport && (sport === 'cricket' || sport === 'football') && (
            <>
              <p><b>What you do ?</b></p>
              <RadioGroup
                options={this.getRadioOptions()}
                onChange={this.onChangeRadioOption}
                error={this.getErrors(sport)}
                onBlur={() => this.isTouched(sport)}
              />
            </>
          )
        }
        <div align="right">
          <Button value="cancel" />
          <Button value="submit" disabled={this.hasErrors()} />
        </div>
      </form>
    );
  }
}

export default InputDemo;
