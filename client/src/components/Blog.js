import React from "react";
import BlogImage from "../static/images/blog_item_banner.jpg";
class Blog extends React.Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  showModal = () => {
    this.props.showModal(this.props.blog)
  }
  render() {
    const {
      blog: { edit, genre, name, date, title, content }
    } = this.props;
    return (
      <div className="blog-box">
        <div className="blog-image">
          <img alt="Abstract Banner" src={BlogImage} />
          <ul className="blog-tag">
            <li>{genre}</li>
          </ul>
        </div>
        <div className="blog-detail">
          <div className="blog-meta">
            <ul className="pl-0">
              <li className="list-inline-item">
                <time className="entry-date published updated">
                  On {date.split("T")[0]}{" "}
                </time>
              </li>
              <li className="list-inline-item">
                <span className="font-italic text-info"> By {name}</span>
              </li>
            </ul>
          </div>
          <div className="blog-title">
            <h4 className="entry-title">{title}</h4>
          </div>
          <div className="blog-content">
            <p>{this.state.isOpen ? content : content.substring(0, 200)}</p>
          </div>
          <div className="btn btn-link pl-0" onClick={this.toggle}>
            Read {this.state.isOpen ? "less" : "more"}
          </div>
          {edit && (
            <button
              className="btn btn-warning rounded-circle float-right"
              onClick={this.showModal}
            >
              <i className="fa fa-pencil"></i>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Blog;
