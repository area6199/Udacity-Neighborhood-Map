import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./NavigationBar";
import NavigationBar2 from "./NavigationBar2";
import MapContainer from "./MapContainer";
import escapeRegExp from "escape-string-regexp";

class App extends Component {
  state = {
    cinemaLocations: [],
    cinemaLocationsFilterd: [],
    errorState: false
  };
  componentDidMount() {
    let cinema;

    fetch(
      // "https://ap.com/v4/cinemas/?location=49.445421,11.081630&distance=10",
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
      .catch((error) => {
        this.setStateOfError(true)
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

  setStateOfcinemaLocations = (id, showInfowWindowValue) => {
    let locations = this.state.cinemaLocationsFilterd;
    let index = locations.findIndex(location => location.id === id);
    // console.log(index);
    if (index !== -1) {
      locations[index].showInfowWindow = showInfowWindowValue;
      // console.log(locations);
      this.setState({
        cinemaLocationsFilterd: locations
      });
    }
  };

  setStateOfError = state => {
    this.setState({
      errorState: state
    });
  };

  render() {
    return (
      <div className="App">
        <NavigationBar2
          cinemaLocationsFilterd={this.state.cinemaLocationsFilterd}
          filterLocations={this.filterLocations}
          setStateOfcinemaLocations={this.setStateOfcinemaLocations}
        />
        <MapContainer
          cinemaLocations={this.state.cinemaLocationsFilterd}
          setStateOfcinemaLocations={this.setStateOfcinemaLocations}
          showError={this.setStateOfError}
        />
        {this.state.errorState === true && (
          <p id="error-info">Error fetching data</p>
        )}
      </div>
    );
  }
}

export default App;
