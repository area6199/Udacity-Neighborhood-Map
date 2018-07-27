import React, { Component } from "react";
import { Marker } from "react-google-maps";

import CreateInfoWindow from "./CreateInfoWindow";

export default class CreateMarker extends Component {
  state = {
    showTooltip: false,
    movies: []
  };
  componentDidMount() {
    let moviesFromCinema;
    fetch(
      "https://api.internationalshowtimes.com/v4/movies/?cinema_id=" +
        this.props.id,
      {
        headers: {
          "X-API-Key": "u0x0cqjLiqAq0jPCeZ0WSrqPFKVylLdV"
        }
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(responseAsJson) {
        moviesFromCinema = responseAsJson.movies;
      })
      .catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      })
      .then(() => {
        this.setState({
          movies: moviesFromCinema
        });
      });
  }

  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  closeWindow() {
    this.setState({ showTooltip: false });
  }

  render() {
    const { showTooltip } = this.state;

    const { lat, lng, name, id } = this.props;

    return (
      <Marker
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
        onClick={this.clickTooltip.bind(this)}
      >
        {showTooltip && (
          <CreateInfoWindow
            name={name}
            id={id}
            closeWindow={this.closeWindow.bind(this)}
            movies={this.state.movies}
          />
        )}
      </Marker>
    );
  }
}
