import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import callAPi from '../../../../libs/utils/Api';
import { MyContext } from '../../../../Context/SnackBarProvider/index';


export default class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: false,
      touched: {
        name: false,
        email: false,
      },
    };
  }

  handleNameChange = (event) => {
    const { touched } = this.setState;
    this.setState({
      name: event.target.value,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          name: true,
        },
      });
    });
  };

  handleEmailChange = (event) => {
    const { touched } = this.state;
    this.setState({
      email: event.target.value,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          email: true,
        },
      });
    });
  };


  isTouched = (value) => {
    const { touched } = this.state;
    const { data } = this.props;
    this.setState({
      touched: {
        ...touched,
        [value]: true,

      },
    }, () => {
      Object.keys(data).forEach((keys) => {
        if (!touched[keys]) {
          this.setState({
            [keys]: data[keys],
          });
        }
      });
    });
  }

  onClickHandler = async (Data, openSnackBar) => {
    const { onSubmit } = this.props;
    this.setState({
      loading: true,
    });
    const response = await callAPi({
      data: { ...Data },
    }, 'put', 'trainee');
    this.setState({ loading: false });
    if (response.status === 'ok') {
      this.setState({
        message: 'Trainee Updated Successfully',
      }, () => {
        const { message } = this.state;
        onSubmit(Data);
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error while submitting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      touched: {},
    });
  }


  render() {
    const {
      open, onClose, data,
    } = this.props;
    const {
      name, email, loading,
    } = this.state;
    const { originalId: id } = data;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullwidth>
          <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={() => this.handleNameChange()}
                  autoFocus
                  // eslint-disable-next-line react/prop-types
                  defaultValue={data.name}
                  margin="dense"
                  id="name"
                  label="Name"
                  type="name"
                  onBlur={() => this.isTouched('name')}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={() => this.handleEmailChange('email')}
                  autoFocus
                  // eslint-disable-next-line react/prop-types
                  defaultValue={data.email}
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  onBlur={() => this.isTouched('email')}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
              {({ openSnackBar }) => (
                <Button
                  onClick={() => {
                    this.onClickHandler({ name, email, id }, openSnackBar);
                    this.formReset();
                  }}
                  color="primary"
                  disabled={loading}
                >
                  {loading && (
                    <CircularProgress size={15} />
                  )}
                  {loading && <span>Submitting</span>}
                  {!loading && <span>Submit</span>}
                </Button>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
