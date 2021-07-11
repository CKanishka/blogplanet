import React from "react";
import { GenresList } from "../Constants";
class InputModal extends React.Component {
  state = {
    name: "",
    email: "",
    content: "",
    title: "",
    genre: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { content, genre, title, edit, _id } = this.props.blog || {};
    const newItem = {
      name: this.state.name || this.props.name,
      email: this.state.email || this.props.email,
      content: this.state.content || content,
      title: this.state.title || title,
      genre: this.state.genre || genre,
    };
    edit ? this.props.updateBlog(newItem, _id) : this.props.addBlog(newItem);
  };

  render() {
    const { modal, handleClose, name, email, blog } = this.props;
    const { content, genre, title } = blog || {};

    const modalStyle = modal
      ? { display: "block", overflowY: "auto" }
      : { display: "none" };

    return modal ? (
      <div className="modal" tabIndex="-1" role="dialog" style={modalStyle}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Blog Details</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.onSubmit}>
                <div className="blog-form">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control text "
                        value={name}
                        placeholder="Enter your name"
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control text"
                        value={email}
                        placeholder="Enter your email-id"
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-md-12">
                      <label>Content</label>
                      <textarea
                        name="content"
                        cols="40"
                        rows="10"
                        className="form-control textarea"
                        defaultValue={content}
                        placeholder="Enter blog content"
                        onChange={this.onChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control text "
                        defaultValue={title}
                        placeholder="Enter the title for blog"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Genre</label>
                      <select
                        className="form-control text"
                        name="genre"
                        defaultValue={genre}
                        onChange={this.onChange}
                        required
                      >
                        <option value=""> Choose a genre</option>
                        {GenresList.slice(1).map((x, index) => (
                          <option key={index} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="submit"
                        className="btn btn-primary float-right"
                        value="Submit"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default InputModal;
