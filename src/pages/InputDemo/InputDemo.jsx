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
      position: '',
      error: {
      },
      isvalid: false,
      touched: {
        name: false,
        sport: false,
        position: false,
      },
    };
  }

  onChangeTextField = (event) => {
    this.setValueAndError({ name: event.target.value }, () => { this.setError(); });
  }

  onChangeSelectOptions = (event) => {
    const sportvalue = event.target.value;
    const newState = {
      sport: sportvalue === 'select' ? '' : sportvalue,
      position: '',
    };
    this.setValueAndError(newState, () => { this.setError(); });
  }

  onChangeRadioOption = (event) => {
    this.setValueAndError({ position: event.target.value }, () => { this.setError(); });
  }


  getRadioOptions = () => {
    const { sport } = this.state;
    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  setError = () => {
    const { touched } = this.state;
    const errormsg = {};
    schema.validate(this.state, { abortEarly: false })
      .then(() => {
        this.setState({ error: {}, isvalid: true });
      })
      .catch((err) => {
        err.inner.forEach((element) => {
          const { path, message } = element;
          if (touched[path]) {
            errormsg[path] = message;
          }
        });
        this.setState({ error: errormsg, isvalid: false });
      });
  }

  hasErrors = () => {
    const { error, touched } = this.state;
    let alltouched = Object.values(touched);
    let isError = Object.values(error);
    isError = isError.filter((errorMessage) => errorMessage !== '');
    alltouched = alltouched.every((value) => value);
    isError = isError.every((value) => value === '');
    if (isError && alltouched) {
      return false;
    }
    return true;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    }, () => {
      this.setError();
    });
  }

  setValueAndError = (newState) => {
    this.setState(newState, () => {
      this.setError();
    });
  }

  getErrors = (field) => {
    // console.log("geterrors");
    const { touched, error } = this.state;
    return touched[field] ? error[field] : '';
  }

  render() {
    const {
      name, sport, error, isvalid,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <TextField
          heading="Name"
          onChange={this.onChangeTextField}
          value={name}
          error={error.name}
          onBlur={() => this.isTouched('name')}
        />

        <SelectField
          defaultOption="select"
          heading="Select Your Game You Play?"
          options={selectOptions}
          value={sport}
          onBlur={() => this.isTouched('sport')}
          onChange={this.onChangeSelectOptions}
          error={error.sport}

        />
        <div>
          {
            sport && (
              <>
                <RadioGroup
                  heading="What you do ?"
                  options={this.getRadioOptions()}
                  onChange={this.onChangeRadioOption}
                  error={error.position}
                  onBlur={() => this.isTouched('position')}
                />
              </>
            )
          }
        </div>
        <div align="right">
          <Button value="cancel" />
          <Button value="submit" disabled={!isvalid} />
        </div>
      </>
    );
  }
}

export default InputDemo;
