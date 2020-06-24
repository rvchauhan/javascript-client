import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes, { bool } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { MyContext } from '../../../../Context/SnackBarProvider/index';
import callAPi from '../../../../libs/utils/Api';

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

  onClickHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
    });
    const { onSubmit } = this.props;
    const { originalId: id } = data;
    const response = await callAPi({}, 'delete', `trainee/${id}`);
    this.setState({ loading: false });
    if (response.status === 'ok') {
      this.setState({
        message: 'This is a success message',
      }, () => {
        const { message } = this.state;
        onSubmit(data);
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'error in submitting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }


  render() {
    const {
      open, onClose, data, onSubmit, loading: { loading },
    } = this.props;
    // const { loading } = this.state;
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
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={() => {
              onSubmit(data);
            }}
          >
            {loading && (
              <CircularProgress size={15} />
            )}
            {loading && <span>Deleting</span>}
            {!loading && <span>Delete</span>}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.objectOf(bool).isRequired,
};
