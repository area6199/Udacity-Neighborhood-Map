import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./NavigationBar";
import NavigationBar2 from "./NavigationBar2";
import MapContainer from "./MapContainer";
import escapeRegExp from "escape-string-regexp";

// import Map from './Map'
// import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    cinemaLocations: [],
    cinemaLocationsFilterd: []
  };
  componentDidMount() {
    let cinema;

    fetch(
      "https://api.internationalshowtimes.com/v4/cinemas/?location=49.445421,11.081630&distance=10",
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
        cinema = responseAsJson.cinemas;
      })
      .catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      })
      .then(() => {
        this.setState({
          cinemaLocations: cinema,
          cinemaLocationsFilterd: cinema
        });
      });
  }

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

  render() {
    return (
      <div className="App">
        <NavigationBar2
          cinemaLocationsFilterd={this.state.cinemaLocationsFilterd}
          filterLocations={this.filterLocations}
        />
        <MapContainer cinemaLocations={this.state.cinemaLocationsFilterd} />
      </div>
    );
  }
}

export default App;
