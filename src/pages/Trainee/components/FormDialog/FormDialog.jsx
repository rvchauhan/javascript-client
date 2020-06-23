/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import schema from './helper';
import { MyContext } from '../../../../Context/SnackBarProvider/index';

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      hasError: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema
      .isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    console.log('field', field);
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  render() {
    const { classes } = this.props;
    const { open, onClose, onSubmit } = this.props;
    const {
      name, email, password, confirmPassword, hasError, error,
    } = this.state;
    this.hasErrors();
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add TRAINEE</DialogTitle>
        <DialogContent className={classes.useStyles}>
          <DialogContentText>
            Add your trainee details
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Name "
                id="Name"
                value={name}
                error={!!error.name}
                fullWidth
                onChange={this.handleChange('name')}
                helperText={this.getError('name')}
                onBlur={() => this.isTouched('name')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                id="email"
                value={email}
                error={!!error.email}
                fullWidth
                onChange={this.handleChange('email')}
                helperText={this.getError('email')}
                onBlur={() => this.isTouched('email')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                id="outlined-start-adornment"
                type="password"
                value={password}
                error={!!error.password}
                fullWidth
                onChange={this.handleChange('password')}
                helperText={this.getError('password')}
                onBlur={() => this.isTouched('password')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                id="password"
                type="password"
                error={!!error.confirmPassword}
                fullWidth
                value={confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                helperText={this.getError('confirmPassword')}
                onBlur={() => this.isTouched('confirmPassword')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
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
                variant="contained"
                color="primary"
                onClick={() => {
                  openSnackBar('This is a success message ! ', 'success');
                  onSubmit({
                    name, email, password, confirmPassword,
                  });
                }}
                disabled={hasError}
              >
                Submit
              </Button>
            )}
          </MyContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(FormDialog);

FormDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
