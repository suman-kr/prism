import React from "react";
import { RouteComponentProps } from "@reach/router";
import { API_URL } from "../../configs";

const initialState = {
  first_name: "",
  city: "",
  contact: "",
  email: "",
  h_no: "",
  last_name: "",
  password: "",
  pin: "",
  roles: "ADV",
  state: "",
  street_one: "",
  street_two: "",
};

export class Signup extends React.Component<RouteComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ...initialState,
      },
    };
  }

  onChange = (name: string, value: string) => {
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  onSubmit = () => {
    if (this.validateForm() === false) {
      fetch(`${API_URL}user/add/`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(this.state.user),
      }).then((e) => {
        alert("Success!");
        this.setState({ user: { ...initialState } });
        window.location.href="login"
      });
    } else {
      alert("Required fields are empty");
    }
  };

  validateForm = () => {
    const { user } = this.state;
    if (
      !user.first_name ||
      !user.city ||
      !user.contact ||
      !user.email ||
      !user.h_no ||
      !user.last_name ||
      !user.password ||
      !user.pin ||
      !user.state ||
      !user.roles
    ) {
      return true;
    }
    return false;
  };

  render() {
    const {
      city,
      contact,
      email,
      first_name,
      h_no,
      last_name,
      password,
      pin,
      roles,
      state,
      street_one,
      street_two,
    } = this.state.user;
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
          <label htmlFor="fname">First Name</label>
          *
          <input
            type="text"
            id="fname"
            name="fname"
            value={first_name}
            onChange={(e) => this.onChange("first_name", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="lname">Last Name</label>
          *
          <input
            type="text"
            id="lname"
            name="lname"
            value={last_name}
            onChange={(e) => this.onChange("last_name", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          *
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => this.onChange("email", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="tel">Phone Number</label>
          *
          <input
            type="tel"
            id="tel"
            name="tel"
            value={contact}
            onChange={(e) => this.onChange("contact", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="house">House/Flat No</label>
          *
          <input
            type="text"
            id="house"
            name="house"
            value={h_no}
            onChange={(e) => this.onChange("h_no", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="street-one">Street 1</label>
          <input
            type="text"
            id="street-one"
            name="street-one"
            value={street_one}
            onChange={(e) => this.onChange("street_one", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="street-two">Street 2</label>
          <input
            type="text"
            id="street-two"
            name="street-two"
            value={street_two}
            onChange={(e) => this.onChange("street_two", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="city">City</label>
          *
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => this.onChange("city", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="state">State</label>
          *
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => this.onChange("state", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="pin">Pincode</label>
          *
          <input
            type="text"
            id="pin"
            name="pin"
            value={pin}
            onChange={(e) => this.onChange("pin", e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="role">Role</label>*
          <select
            name="role"
            id="role"
            value={roles}
            onChange={(e) => this.onChange("roles", e.target.value)}
          >
            <option value="ADV">Advertiser</option>
            <option value="PTR">Partner</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="pass">Password</label>
          *
          <input
            type="password"
            id="pass"
            name="pass"
            value={password}
            onChange={(e) => this.onChange("password", e.target.value)}
          />
        </div>
        <div className="input">
          <button type="submit" onClick={this.onSubmit}>
            Signup
          </button>
        </div>
      </div>
    );
  }
}

interface State {
  user: UserForm;
}

interface UserForm {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  h_no: string;
  street_one: string;
  street_two: string;
  city: string;
  state: string;
  pin: string;
  roles: string;
  password: string;
}
