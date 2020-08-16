import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  username = React.createRef();
  // compoenentDidMount() {
  //   this.username.current.focus();
  // }

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //const username = this.username.current.value;
    console.log("Submitted");
  };

  render() {
    const { account } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit} action="">
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              value={account.username}
              onChange={this.handleChange}
              autoFocus
              ref={this.username}
              id="username"
              name="user"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
