import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";

export default class CreateInfoWindow extends Component {
  setFocusToInfoWindow(event) {
    const cinemaIndex = Number(
      document
        .getElementsByClassName("info-window-main")[0]
        .getAttribute("cinemaid")
    );

    if (event.which === 9) {
      if (
        cinemaIndex + 1 <
        document.getElementsByClassName("filtered-cinemas").length
      ) {
        document
          .getElementsByClassName("filtered-cinemas")[cinemaIndex].focus();
      } else {
        window.focus();
      }
    }
  }

  populateInfoWindow = obj => {
    const objLength = obj.length - 1;
    return obj.map((movie, index) => (
      <div key={this.props.id + index + movie.id + movie.title} className="info-window-details">
        <img
          src={movie.poster_image_thumbnail}
          alt={movie.title}
          className="poster-image-thumbnail"
          style={{ width: 25, paddingRight: 10 }}
        />

        {(index === objLength && (
          <span onKeyDown={this.setFocusToInfoWindow} tabIndex="0">
            {/* <span onKeyDown={this.setFocusToInfoWindow( event,2)} tabIndex="0"> */}
            {movie.title}
          </span>
        )) || <span tabIndex="0">{movie.title}</span>}
      </div>
    ));
  };

  render() {
    const { name } = this.props;

    return (
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div
          className="info-window-main"
          cinemaid={this.props.id}
          style={{ maxHeight: 350, maxWidth: 170 }}
        >
          <h3 className="info-window-details-headline" tabIndex="0">
            {name}
          </h3>
          <h4 tabIndex="0">Movies playing:</h4>
          <div>
            {typeof this.props.movies !== "undefined" &&
              ((this.props.movies.length === 0 && (
                <p onKeyDown={this.setFocusToInfoWindow} tabIndex="0">
                  No programm available
                </p>
              )) ||
                this.populateInfoWindow(this.props.movies))}
          </div>
        </div>
      </InfoWindow>
    );
  }
}
