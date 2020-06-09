import React from 'react';
// import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import FormDialog from './index';
import trainees from './data/trainee';
import { Table } from '../../components/index';


const UseStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2, 0, 2),
  },
});

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
    const { classes } = this.props;
    // const { trainees } = props;
    return (
      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEE
          </Button>
        </div>
        <FormDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
        <Table
          id="id"
          data={trainees}
          column={[
            {
              field: 'name',
              label: 'Name',
              align: 'center',
            },
            {
              field: 'email',
              label: 'EmailAddress',
            },
          ]}
        />
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
      </>
    );
  }
}

Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(UseStyles)(Trainee);
