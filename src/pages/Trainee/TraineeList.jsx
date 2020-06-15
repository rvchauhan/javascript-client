import React from 'react';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Table } from '../../components/index';
import { FormDialog, EditDialog, DeleteDialog } from './components/index';
import callApi from '../../libs/utils/Api';

import { MyContext } from '../../Context/SnackBarProvider/index';

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
      orderby: '',
      order: '',
      EditOpen: false,
      DelOpen: false,
      dataObj: [],
      loading: false,
      page: 0,
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
      Count: 0,
    };
  }

  getDateFormat = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss')

  handleClick = (status) => {
    this.setState({ open: status });
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
    this.handlePageChange(newPage);
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

  onSubmitEdit = (data) => {
    this.setState({ open: false, EditOpen: false }, () => { console.log('Submit Data', data); });
  };

  onSubmitDelete = (data) => {
    const { page, Count, rowsPerPage } = this.state;
    this.setState({
      DelOpen: false, loader: true,
    }, () => { console.log('Deleted Data', data); });
    if (Count - page * rowsPerPage !== 1) {
      this.handlePageChange(page);
    } else if (page !== 0) {
      this.handlePageChange(page - 1);
      this.setState({ page: page - 1 });
    } else {
      this.handlePageChange(page);
    }
  };

  onSubmitAdd = (data) => {
    const { page } = this.state;
    this.setState({
      open: false, loader: true,
    }, () => { console.log('Submitted Data', data); });
    this.handlePageChange(page);
  }


  handlePageChange = (newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({ loading: true });
    const value = this.context;
    callApi({ params: { skip: newPage * rowsPerPage, limit: rowsPerPage } }, 'get', 'trainee').then((response) => {
      if (response.data === undefined) {
        this.setState({
          loading: false,
          message: 'This is an error',
        }, () => {
          const { message } = this.state;
          value.openSnackBar(message, 'error');
        });
      } else {
        const { records, count } = response.data;
        this.setState({ dataObj: records, loading: false, Count: count });
      }
      return response;
    });
  }

  componentDidMount = () => {
    this.handlePageChange(0);
  }

  render() {
    const {
      orderBy, order, open, EditOpen, DelOpen, page, rowsPerPage, editData,
      deleteData, dataObj, loading, Count,
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
          onClose={() => this.handleClick(false)}
          onSubmit={this.onSubmitAdd}
          open={open}
        />
        <EditDialog
          data={editData}
          onClose={this.handleEditClick}
          onSubmit={this.onSubmitEdit}
          open={EditOpen}
        />
        <DeleteDialog
          data={deleteData}
          onSubmit={this.onSubmitDelete}
          onClose={this.handleDeleteClick}
          open={DelOpen}
        />
        <Table
          loader={loading}
          id="id"
          data={dataObj}
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
          orderby={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={Count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          onChangePage={this.handleChangePage}
        />
      </>
    );
  }
}
Trainee.contextType = MyContext;
Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(UseStyles)(Trainee);
