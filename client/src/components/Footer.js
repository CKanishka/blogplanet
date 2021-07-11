import React from "react";
import logo from "../static/images/logo.png";
export default class Footer extends React.Component {
  render() {
    return (
      <div className="banner p-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <img
                alt="banner"
                className="float-left "
                src={logo}
                height="100px"
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 d-table my-auto">
              &copy;Copyright 2020 Blog Planet
            </div>
          </div>
        </div>
      </div>
    );
  }
}
