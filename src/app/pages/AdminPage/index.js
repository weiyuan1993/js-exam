import React, { Component } from 'react';
import { login } from 'app/utils/auth';

class AdminPage extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <div>
        <input placeholder="username" onChange={(e) => this.setState({ username: e.target.value })} />
        <input placeholder="password" onChange={(e) => this.setState({ password: e.target.value })} />
        <button 
          onClick={() => 
            login({
              username: this.state.username,
              password: this.state.password
            })
        }>
          Login
        </button>
      </div>
    );
  }
}

export default AdminPage;
