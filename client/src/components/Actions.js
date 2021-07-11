import React from 'react';
import pen from "../static/images/pen.png";

const Actions = ({showModal,filterByUser}) => (
  <div className="widget d-flex align-items-center justify-content-between mb-5">
    <div>
      <button
        className="btn btn-info btn-md d-block my-3"
        onClick={showModal}
      >
        <i className="fa fa-plus-square-o mr-2"></i> Write a blog
      </button>
      <button
        className="btn btn-warning btn-md d-block"
        onClick={filterByUser}
      >
        <i className="fa fa-pencil-square-o mr-2"></i> Edit my blogs
      </button>
    </div>
    <img src={pen} alt="logo" className="logo-animated" />
  </div>
);

export default Actions;