import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            MERN Stack
          </a>
        </div>
      </nav>
    );
  }
}

export default Nav;
