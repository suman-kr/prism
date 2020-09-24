import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { API_URL } from "../../configs";
export class Login extends React.Component<RouteComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onChange = (name: string, value: string) => {
    this.setState({ ...this.state, [name]: value });
  };

  onSubmit = () => {
    if (this.validateForm() === true) {
      fetch(`${API_URL}user/login/`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(this.state),
      })
        .then((e) => e.json())
        .then((e) => {
          console.log(e);
          localStorage.setItem("role", e.user.roles);
          window.location.href = "/";
        })
        .catch((e) => alert("Something went Wrong!"));
    } else {
      alert("Required fields are empty");
    }
  };

  validateForm = () => {
    const { username, password } = this.state;
    if (!username || !password) {
      return false;
    }
    return true;
  };

  render() {
    const { password, username } = this.state;
    return (
      <>
        <Link to="/signup" style={{ padding: "10px" }}>
          Signup
        </Link>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>LOGIN</h3>
          <div className="input">
            <label htmlFor="username">Email/Phone Number</label>
            *
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => this.onChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="pass">Password</label>
            *
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => this.onChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="input">
            <button type="submit" onClick={this.onSubmit}>
              Login
            </button>
          </div>
        </div>
      </>
    );
  }
}

interface State {
  username: string;
  password: string;
}
