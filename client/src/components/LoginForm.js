import React from "react";
import logo from "../static/images/logo.png";
export default class LoginForm extends React.Component {
  state = {
    login: true,
  };

  toggleLogin = () => {
    this.setState({ login: !this.state.login });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.authenticate(this.state.login);
  };
  render() {
    return (
      <div className="container banner text-left">
        <div className="row">
          <div className="col-md-6">
            <h3 id="title" className="mb-3">
              Enter your details here
            </h3>
            <div className="blog-form">
              {!this.state.login ? (
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      onChange={this.props.onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email-id"
                      onChange={this.props.onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control text "
                      placeholder="Enter your password"
                      onChange={this.props.onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                      type="password"
                      name="password2"
                      className="form-control"
                      placeholder="Re-Enter your password"
                      onChange={this.props.onChange}
                      required
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                  />
                </form>
              ) : (
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email-id"
                      onChange={this.props.onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      onChange={this.props.onChange}
                      required
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                  />
                </form>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <img
              alt="banner"
              className="img-fluid"
              src={logo}
              style={{ width: "100%" }}
            />
            <button className="btn btn-warning" onClick={this.toggleLogin}>
              {this.state.login ? "Register" : "Login"}
            </button>
            <form
              action="https://myblogdashboard.herokuapp.com/"
              className="d-inline-block mt-2 ml-2"
            >
              <button className="btn btn-info">
                <i className="fa fa-bar-chart mr-2"></i>View Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
