import React from 'react';

export default class Genres extends React.Component{
    handleClick = (genre) => {
        this.props.filterGenre(genre)
    }
    render(){
        return(
            <div id="categories" className="widget">
                <h2 className="widget-title">Genres</h2>
                {this.props.genres.map((genre,index)=>
                <ul key={index}>
                    <li style={{color:"#007bff",cursor:"pointer"}} onClick={(event) => this.handleClick(genre)}> {genre} </li>
                </ul>)}
            </div>
        );
    }

}