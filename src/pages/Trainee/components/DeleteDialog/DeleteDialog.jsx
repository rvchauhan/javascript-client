import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { MyContext } from '../../../../Context/SnackBarProvider/index';

export default class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSnackBarMessage = (data, openSnackBar) => {
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(data.createdAt).isAfter(date));
    if (isAfter) {
      this.setState({
        message: 'This is a success Message! ',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'This is an error',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }


  render() {
    const {
      open, onClose, onSubmit, data,
    } = this.props;

    return (
      <Dialog open={open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Delete Item</DialogTitle>
        <DialogContentText>
          Do you really want to remove this item?
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <MyContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  onSubmit({ data });
                  this.handleSnackBarMessage(data, openSnackBar);
                }}
              >
                Delete
              </Button>
            )}
          </MyContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
