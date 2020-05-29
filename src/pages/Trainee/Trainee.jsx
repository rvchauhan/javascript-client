import React from 'react';
// import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import FormDialog from './index';
import NavBar from '../Components/index';

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = (status) => {
    this.setState({ open: status }, () => { console.log(this.state); });
  };

  handleSubmit = (data) => {
    this.setState({ open: false }, () => { console.log(data); });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={() => this.handleClick(true)}>
          ADD TRAINEE
        </Button>
        <FormDialog
          open={open}
          onClose={() => this.handleClick(false)}
          onSubmit={() => this.handleSubmit}
        />
      </>
    );
  }
}

export default Trainee;
