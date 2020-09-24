import React from "react";
import { RouteComponentProps } from "@reach/router";
import { API_URL } from "../../configs";
export class EmailVerify extends React.Component<RouteComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      email: "",
    };
  }
  onChange = (name: string, value: string) => {
    this.setState({ ...this.state, [name]: value });
  };

  onSubmit = () => {
    if (this.validateForm() === true) {
      fetch(`${API_URL}user/verify/`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(this.state),
      }).then((e) => {
        alert("Email Verified");
        window.location.href = "login";
      });
    } else {
      alert("Required fields are empty");
    }
  };

  validateForm = () => {
    const { email, code } = this.state;
    if (!email || !code) {
      return false;
    }
    return true;
  };
  render() {
    const { code, email } = this.state;
    return (
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
        <div className="input">
          <label htmlFor="email">Email</label>
          <span>*</span>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => this.onChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="pass">Code</label>
          *
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => this.onChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="input">
          <button type="submit" onClick={this.onSubmit}>
            Verify
          </button>
        </div>
      </div>
    );
  }
}

interface State {
  email: string;
  code: string;
}
