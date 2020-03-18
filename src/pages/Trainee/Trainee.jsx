import React from 'react';
// import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import FormDialog from './index';

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true }, () => { console.log(this.state); });
  };

  handleClose = () => {
    this.setState({ open: false }, () => { console.log(this.state); });
  };

  handleSubmit = (data) => {
    this.setState({ open: false }, console.log(data));
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <FormDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
      </>
    );
  }
}

export default Trainee;
