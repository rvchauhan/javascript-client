/* eslint-disable react/prop-types */
import React from 'react';
// import * as yup from 'yup';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import trainees from './data/trainee';
import { Table } from '../../components/index';
import { FormDialog, EditDialog, DeleteDialog } from './components/index';

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
      EditOpen: false,
      DelOpen: false,
      page: 0,
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
    };
  }

  getDateFormat = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss')

  handleClick = (status, data) => {
<<<<<<< HEAD
    this.setState({ open: status }, () => { console.log(this.state, data); });
=======
    this.setState({ open: status }, () => { console.log(data); });
>>>>>>> 4a257518b1c22123a9c19ee78e23fe50c7ca0dea
  };

  handleEditDialogopen = (data) => {
    this.setState({ EditOpen: true, editData: data }, () => { console.log(this.state); });
  }

  handleRemoveDialogopen = (data) => {
    this.setState({ DelOpen: true, deleteData: data }, () => { console.log(this.state); });
  }

  handleEditClick = (data) => {
    this.setState({ EditOpen: false }, () => console.log(data));
  };

  handleDeleteClick = (data) => {
    this.setState({ DelOpen: false }, () => console.log(data.data));
  };

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data));
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  render() {
    const {
      orderBy, order, open, EditOpen, DelOpen, page, rowsPerPage, editData, deleteData,
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={() => this.handleClick(true)}>
            ADD TRAINEE
          </Button>
        </div>
        <FormDialog
          open={open}
          onClose={() => this.handleClick(false)}
          onSubmit={(data) => this.handleClick(false, data)}
        />
        <EditDialog
          data={editData}
          onClose={this.handleEditClick}
          onSubmit={this.handleEditClick}
          open={EditOpen}
        />
        <DeleteDialog
          data={deleteData}
          onClose={this.handleDeleteClick}
          onSubmit={this.handleDeleteClick}
          open={DelOpen}
        />
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
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogopen,
            },
            {

              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogopen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          onChangePage={this.handleChangePage}
        />
      </>
    );
  }
}

Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(UseStyles)(Trainee);
