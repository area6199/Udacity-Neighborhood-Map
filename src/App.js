import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./NavigationBar";
import MapContainer from "./MapContainer";
// import Map from './Map'
// import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    cinemaLocations: [],
  }
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
          cinemaLocations: cinema
        });
      });
  }
  render() {
    return (
      <div className="App">
        <NavigationBar cinemaLocations={this.state.cinemaLocations} />
        <MapContainer cinemaLocations={this.state.cinemaLocations}/>
      </div>
    );
  }
}

export default App;
