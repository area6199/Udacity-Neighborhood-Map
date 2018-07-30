import React, { Component } from "react";
import { Marker } from "react-google-maps";

import CreateInfoWindow from "./CreateInfoWindow";

export default class CreateMarker extends Component {
  state = {
    movies: [],
    errorState: false
  };

  // fetch movies wich are playing in each cinema
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
      .catch(error => {
        this.setState({
          errorState: true
        });
        console.log("Looks like there was a problem: \n", error);
      })
      .then(() => {
        this.setState({
          movies: moviesFromCinema
        });
      });
  }

  showInfoWindow = () => {
    this.props.setStateOfcinemaLocations(this.props.id, true);
  };

  closeInfoWindow() {
    this.props.setStateOfcinemaLocations(this.props.id, false);
  }

  render() {
    const { lat, lng, name, id } = this.props;

    return (
      <div>
        {this.state.errorState === true && (
          <p id="error-info">Error fetching data</p>
        )}
        <Marker
          position={{
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          }}
          onClick={this.showInfoWindow.bind(this)}
        >
          {typeof this.props.cinemaLocations[this.props.index]
            .showInfowWindow !== "undefined" &&
            (this.props.cinemaLocations[this.props.index].showInfowWindow ===
              true && (
              <CreateInfoWindow
                name={name}
                id={id}
                key={id}
                closeInfoWindow={this.closeInfoWindow.bind(this)}
                movies={this.state.movies}
              />
            ))}
        </Marker>
      </div>
    );
  }
}
