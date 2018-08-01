import React, { Component } from "react";
import "./App.css";
import NavigationBar2 from "./NavigationBar2";
import MapContainer from "./MapContainer";
import escapeRegExp from "escape-string-regexp";
import markerBlue from './marker-blue.png'
import markerDefault from './marker-default.png'

class App extends Component {
  state = {
    cinemaLocations: [],
    cinemaLocationsFilterd: [],
    errorState: false,
    hasError: false
  };
  componentDidMount() {
    let cinemas;
    // fetch cinema locations from https://www.internationalshowtimes.com/
    fetch(
      "https://api.internationalshowtimes.com/v4/cinemas/?location=49.445421,11.081630&distance=10",
      {
        headers: {
          "X-API-Key": "u0x0cqjLiqAq0jPCeZ0WSrqPFKVylLdV"
        }
      }
    )
      .then(this.handleErrors)
      .then(function(response) {
        return response.json();
      })
      .then(function(responseAsJson) {
        cinemas = responseAsJson.cinemas;
      })
      .catch(error => {
        this.setStateOfError(true);
        console.log("Looks like there was a problem: \n", error);
      })

      .then(() => {
        this.getShowtimes(cinemas);
      });
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    <p id="error-info">Error loading Map</p>;

    this.setState({ hasError: true });
  }

  getShowtimes = cinemas => {
    // let cinemas
    cinemas.map((cinema, index) => {
      fetch(
        "https://api.internationalshowtimes.com/v4/movies/?cinema_id=" +
          cinema.id,
        {
          headers: {
            "X-API-Key": "u0x0cqjLiqAq0jPCeZ0WSrqPFKVylLdV"
          }
        }
      )
        .then(this.props.handleErrors)
        .then(function(response) {
          return response.json();
        })
        .then(function(responseAsJson) {
          cinemas[index].movies = responseAsJson.movies;
        })
        .catch(error => {
          this.setState({
            errorState: true
          });
          console.log("Looks like there was a problem: \n", error);
        });
    });
    this.setState({
      cinemaLocations: cinemas,
      cinemaLocationsFilterd: cinemas
    });
  };

  // filter function using a regular expression
  filterLocations = value => {
    let searchedLocations;
    const match = new RegExp(escapeRegExp(value), "i");
    searchedLocations = this.state.cinemaLocations.filter(location =>
      match.test(location.name)
    );
    this.setState({
      cinemaLocationsFilterd: searchedLocations
    });
  };

  // set the showing state of the InfoWindow of a marker
  setStateOfcinemaLocations = (id, showInfowWindowValue) => {
    let locations = this.state.cinemaLocationsFilterd;
    let index = locations.findIndex(location => location.id === id);
    if (index !== -1) {
      locations[index].showInfowWindow = showInfowWindowValue;
      if (showInfowWindowValue) {
        locations[index].markerIcon = markerBlue
      }
      else{
        locations[index].markerIcon = markerDefault
      }
      this.setState({
        cinemaLocationsFilterd: locations
      });
    }
  };

  // set state in order to display the error message
  setStateOfError = state => {
    this.setState({
      errorState: state
    });
  };

  handleErrors = response => {
    if (!response.ok) {
      this.setStateOfError(true);
    }
    return response;
  };

  render() {
    return (
      <div role="main" className="App">
        <NavigationBar2
          cinemaLocationsFilterd={this.state.cinemaLocationsFilterd}
          filterLocations={this.filterLocations}
          setStateOfcinemaLocations={this.setStateOfcinemaLocations}
        />
        <MapContainer
          cinemaLocations={this.state.cinemaLocationsFilterd}
          setStateOfcinemaLocations={this.setStateOfcinemaLocations}
          showError={this.setStateOfError}
          handleErrors={this.handleErrors}
        />

        {this.state.errorState === true && (
          <p id="error-info">Error fetching data</p>
        )}
      </div>
    );
  }
}

export default App;
