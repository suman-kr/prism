import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
export class Home extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div>
        {localStorage.getItem("role") ? (
          localStorage.getItem("role") === "ADV" ? (
            <h3>Advertiser</h3>
          ) : (
            <h3>Partner</h3>
          )
        ) : (
          <>
            <span>Please Login or Sign Up!</span>
            <div>
              <span style={{ margin: "5px" }}>
                <Link to="/login">Login</Link>
              </span>
              <span style={{ margin: "5px" }}>
                {" "}
                <Link to="/signup">Signup</Link>
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
}
