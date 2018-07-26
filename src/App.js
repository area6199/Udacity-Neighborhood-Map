import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./NavigationBar";
import MapContainer from "./MapContainer";
// import Map from './Map'
// import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <MapContainer />
      </div>
    );
  }
}

export default App;
