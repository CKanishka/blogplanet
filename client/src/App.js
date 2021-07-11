import React from "react";
import "./App.css";
import BlogContainer from "./components/BlogContainer";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import HeadingBanner from "./components/HeadingBanner";
import Footer from "./components/Footer";
class App extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    route: "login",
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  authenticate = (login) => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    if (login) {
      axios
        .post(`/api/authenticate`, user)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ route: "blog", name: res.data.name });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          alert(
            "Failed to login! Please try again with correct credentials or register"
          );
        });
    } else {
      if (this.state.password !== this.state.password2) {
        alert(
          "Your passwords do not match, please make sure both passwords match."
        );
        return;
      }
      axios
        .post(`/api/register`, user)
        .then((res) => {
          if (res.status === 200) {
            alert("Registered Successfully! Welcome to Blog Planet ");
            this.setState({ route: "blog",name: res.data.name });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to register! Please try again with another email-id");
        });
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.route === "login" ? (
          <LoginForm
            onChange={this.onChange}
            authenticate={this.authenticate}
          />
        ) : (
          <React.Fragment>
            <HeadingBanner />
            <BlogContainer name={this.state.name} email={this.state.email} />
            <Footer />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
