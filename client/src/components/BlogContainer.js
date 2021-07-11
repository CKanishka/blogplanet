import React from "react";
import axios from "axios";
import Blog from "./Blog";
import Genres from "./Genres";
import InputModal from "./InputModal";
import Actions from "./Actions";

class Blog_Container extends React.Component {
  state = {
    modal: false,
    blogs: [],
    filteredBlogs: [],
    filter: false,
    activeGenre: "All",
    activeBlog: null,
  };

  componentDidMount() {
    axios.get(`http://localhost:5001/api`).then((res) => {
      this.setState({ blogs: res.data });
    });
  }

  showModal = (blog) => {
    this.setState({ modal: true, activeBlog: blog });
  };

  hideModal = () => {
    this.setState({ modal: false, activeBlog: null });
  };

  addBlog = (item) => {
    axios
      .post(`http://localhost:5001/api`, item)
      .then((res) => {
        alert(`Hi, ${item.name} your blog has been published`);
        this.setState(
          (state) => ({
            blogs: [res.data, ...state.blogs],
          }),
          () => {
            this.filterByUser();
          }
        );
      })
      .catch((err) => alert(err));
    this.hideModal();
  };

  updateBlog = (item, id) => {
    axios
      .put(`http://localhost:5001/api/${id}`, item)
      .then((res) => {
        alert(`Hi, ${item.name} your blog has been edited.`);
        this.setState(
          (state) => ({
            blogs: state.blogs.map((blog) =>
              blog._id === id
                ? { _id: id, date: new Date().toISOString(), ...item }
                : blog
            ),
          }),
          () => {
            this.filterByUser();
          }
        );
      })
      .catch((err) => alert(err));
    this.hideModal();
  };

  filterByGenre = (genre) => {
    const filteredBlogs = this.state.blogs.filter(
      (blog) => blog.genre === genre || genre === "All"
    );
    this.setState({
      filter: true,
      filteredBlogs: filteredBlogs,
      activeGenre: genre,
    });
  };

  filterByUser = () => {
    const filteredBlogs = this.state.blogs
      .filter(
        (blog) =>
          blog.name === this.props.name && blog.email === this.props.email
      )
      .map((blog) => ({ ...blog, edit: "true" }));
    this.setState({ filter: true, filteredBlogs: filteredBlogs });
  };
  render() {
    const { filter, filteredBlogs, blogs, activeGenre } = this.state;
    const blogsList = filter ? filteredBlogs : blogs;
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-md-8">
            {blogsList.length ? (
              blogsList.map((blog) => (
                <Blog key={blog._id} blog={blog} showModal={this.showModal} />
              ))
            ) : (
              <div className="d-table mx-auto alert alert-info">
                No blogs found
              </div>
            )}
          </div>
          <div className="col-md-4">
            <Actions
              showModal={() => this.showModal()}
              filterByUser={this.filterByUser}
            />
            <Genres
              filterGenre={this.filterByGenre}
              activeGenre={activeGenre}
            />
          </div>
        </div>
        <InputModal
          modal={this.state.modal}
          handleClose={this.hideModal}
          name={this.props.name}
          email={this.props.email}
          blog={this.state.activeBlog}
          addBlog={this.addBlog}
          updateBlog={this.updateBlog}
        />
      </div>
    );
  }
}

export default Blog_Container;
