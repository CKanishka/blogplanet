import React from "react";
import { GenresList } from "../Constants";

export default class Genres extends React.Component {
  handleClick = (genre) => {
    this.props.filterGenre(genre);
  };
  render() {
    return (
      <div id="categories" className="widget">
        <h2 className="widget-title">Genres</h2>
        <ul className="list-group list-group-flush rounded">
          {GenresList.map((genre, index) => (
            <li
              key={index}
              onClick={() => this.handleClick(genre)}
              className={`list-group-item list-group-item-action cp ${this.props.activeGenre===genre?'active':''}`}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
