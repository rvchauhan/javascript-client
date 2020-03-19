import React from 'react';
import {
  schema, selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../config/constant';
import TextField from '../../components/TextField/TextField';
import SelectField from '../../components/SelectField/selectField';
import { RadioGroup } from '../../components/RadioGroup/index';

import { Button } from '../../components/Button/index';


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      hasError: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
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
    let { cricket, football } = this.state;
    const { sport } = this.state;
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
    const { hasError } = this.state;
    schema.isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
    return hasError;
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
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  };

  render() {
    const { sport, name } = this.state;
    console.log(this.state);
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
