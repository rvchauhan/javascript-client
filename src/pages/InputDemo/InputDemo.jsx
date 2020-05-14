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

  onChange = (field, event) => {
    if (field === 'name') {
      this.setValueAndError({ name: event.target.value });
    } else if (field === 'position') {
      this.setValueAndError({ position: event.target.value });
    } else {
      const sportvalue = event.target.value;
      const newState = {
        sport: sportvalue === 'select' ? '' : sportvalue,
        position: '',
      };
      this.setValueAndError(newState);
    }
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

  handleClick = () => {
    this.setState({ sport: null }); // here we reset value
  };

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

    return (
      <>
        <TextField
          heading="Name"
          onChange={(event) => this.onChange('name', event)}
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
          onChange={(event) => this.onChange('sport', event)}
          error={error.sport}
        />
        <div>
          {
            sport && (
              <>
                <RadioGroup
                  heading="What you do ?"
                  options={this.getRadioOptions()}
                  onChange={(event) => this.onChange('position', event)}
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
