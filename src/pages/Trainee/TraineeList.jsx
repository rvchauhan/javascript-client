import React from 'react';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import { withStyles } from '@material-ui/core';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { Table } from '../../components/index';
import { FormDialog, EditDialog, DeleteDialog } from './components/index';
import { GET_TRAINEE } from './Query';
import { MyContext } from '../../Context/SnackBarProvider/index';
import { DELETE_TRAINEE, UPDATE_TRAINEE, CREATE_TRAINEE } from './Mutation';

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
      page: 0,
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
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

  onSubmitEdit = async (data, openSnackBar, updateTrainee) => {
    try {
      const { name, email, id } = data;
      await updateTrainee({ variables: { name, email, id } });
      this.setState({
        EditOpen: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch {
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
  };

  onSubmitDelete = async (data, deleteTrainee, openSnackBar) => {
    const { originalId: id } = data;
    const { rowsPerPage, page } = this.state;
    const {
      data: {
        getTrainee: { count = 0 } = {},
        refetch,
      },
    } = this.props;
    const response = await deleteTrainee({ variables: { id } });
    if (response) {
      this.setState({
        DelOpen: false,
      }, () => {
        openSnackBar('Trainee Deleted Successfully', 'success');
      });
      if (count - page * rowsPerPage === 1 && page > 0) {
        refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
      }
    }
  }


  onSubmitAdd = async (data, openSnackBar, createTrainee) => {
    try {
      const { name, email, password } = data;
      await createTrainee({ variables: { name, email, password } });
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch {
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
  }


  handlePageChange = (refetch) => async (event, newPage) => {
    const { rowsPerPage } = this.state;
    await this.setState({ page: newPage });
    refetch({ skip: newPage * rowsPerPage, limit: rowsPerPage });
  }

  render() {
    const {
      orderBy, order, open, EditOpen, DelOpen, page, rowsPerPage, editData,
      deleteData,
    } = this.state;
    const {
      classes,
      data: {
        getTrainee: { records = [], count = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;
    const variables = { skip: page * rowsPerPage, limit: rowsPerPage };
    return (
      <>
        <Mutation
          mutation={DELETE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
        >
          {(deleteTrainee, delLoader = { loading }) => (
            <Mutation
              mutation={CREATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
            >
              {(createTrainee, createrLoader = { loading }) => (
                <Mutation
                  mutation={UPDATE_TRAINEE}
                  refetchQueries={[{ query: GET_TRAINEE, variables }]}
                >
                  {(updateTrainee, updateLoader = { loading }) => (
                    <MyContext.Consumer>
                      {({ openSnackBar }) => (
                        <>
                          <div className={classes.root}>
                            <Button variant="outlined" color="primary" onClick={() => this.handleClick(true)}>
                              ADD TRAINEE
                            </Button>
                          </div>
                          <FormDialog
                            onClose={() => this.handleClick(false)}
                            onSubmit={(data) => this.onSubmitAdd(data, openSnackBar, createTrainee)}
                            open={open}
                            loading={createrLoader}
                          />
                          <EditDialog
                            data={editData}
                            onClose={this.handleEditClick}
                            onSubmit={
                              (data) => this.onSubmitEdit(data, openSnackBar, updateTrainee)
                            }
                            open={EditOpen}
                            loading={updateLoader}
                          />
                          <DeleteDialog
                            data={deleteData}
                            onSubmit={
                              (data) => this.onSubmitDelete(data, deleteTrainee, openSnackBar)
                            }
                            onClose={this.handleDeleteClick}
                            open={DelOpen}
                            loading={delLoader}
                          />
                          <Table
                            loader={loading}
                            id="id"
                            data={records}
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
                            count={count}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            onChangePage={this.handlePageChange(refetch, count)}
                          />
                        </>
                      )}
                    </MyContext.Consumer>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}


Trainee.contextType = MyContext;
Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf.isRequired,
};

export default Compose(
  withStyles(UseStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 10 } },
  }),
)(Trainee);
