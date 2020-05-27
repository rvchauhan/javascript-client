import React from 'react';
// import * as yup from 'yup';
import * as moment from 'moment';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
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
      selected: '',
      orderBy: '',
      order: '',
    };
  }

  getDateFormat = (date) => {
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss');
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

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data));
  };

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }


  render() {
    const { orderBy, order } = this.state;
    const { classes } = this.props;
    // const { trainees } = props;
    // console.log("/?????", trainees[0].name)
    return (

      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEE
          </Button>
        </div>
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
              format: (value) => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'left',
              format: this.getDateFormat,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
      </>
    );
  }
}

export default withStyles(UseStyles)(Trainee);
