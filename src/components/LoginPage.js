import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitPassword } from '../actions/login';
import './LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.actions = this.props.actions;
    this.submitPassword = this.actions.submitPassword;
    this.state = { password: '' };
  }
  componentDidUpdate() {
    if (this.props.isLogin) {
      this.props.history.push('/js-exam');
    }
  }
  render() {
    return (
      <div className="login">
        <TextField
          onChange={e => this.setState({ password: e.target.value })}
          margin="normal"
          placeholder="input the password to login"
        />
        <Button
          variant="outlined"
          onClick={() => this.submitPassword(this.state.password)}
        >
          Login
        </Button>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {
      isLogin: state.login.isLogin
    };
  },
  dispatch => {
    return {
      actions: {
        submitPassword: (password) => dispatch(submitPassword(password))
      }
    };
  }
)(LoginPage));
