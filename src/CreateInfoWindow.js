import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";

export default class CreateInfoWindow extends Component {
  state = {
    movies: []
  };

  render() {
    const { name } = this.props;

    return (
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div className="info-window">
          <h2>{name}</h2>
          <h4>Movies playing</h4>
          {(this.props.movies.length === 0 && <p>No programm available</p>) ||
            this.props.movies.map(movie => (
              <div className="info-window-details">
                <img
                  src={movie.poster_image_thumbnail}
                  alt={movie.title}
                  className="poster-image-thumbnail"
                  style={{ width: 25, paddingRight: 10 }}
                />
                <span>{movie.title}</span>
              </div>
            ))}
        </div>
      </InfoWindow>
    );
  }
}
