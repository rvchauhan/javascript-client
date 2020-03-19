import React from 'react';
// import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormDialog from './index';
import trainees from './data/trainee';


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
    // const { trainees } = props;
    // console.log("/?????", trainees[0].name)
    return (
      <>
        <ul>
          {
            trainees && trainees.length && trainees.map((trainee) => (
              <li>
                <Link to={`/Trainee/${trainee.id}`}>
                  {trainee.name}
                </Link>
              </li>
            ))
          }

        </ul>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <FormDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
      </>
    );
  }
}

export default Trainee;
