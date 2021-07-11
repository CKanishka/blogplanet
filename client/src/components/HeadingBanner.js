import React from "react";
import blog_banner from "../static/images/blog_banner.png";
import logo from "../static/images/logo.png";
class HeadingBanner extends React.Component {
  render() {
    return (
      <div className="banner py-1">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ">
              <img alt="banner" className="img-fluid" src={logo} />
            </div>
            <div className="col-md-6">
              <img alt="banner" className="img-fluid" src={blog_banner} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeadingBanner;
