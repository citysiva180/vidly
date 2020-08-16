import React, { Component } from "react";
import Input from "../components/input";

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
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
