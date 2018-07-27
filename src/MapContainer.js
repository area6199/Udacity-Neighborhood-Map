import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import CreateMarker from "./CreateMarker";

const UdacityNeighborhoodMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultCenter={props.center} defaultZoom={props.defaultZoom}>
      {props.places}
    </GoogleMap>
  ))
);

export default class MapContainer extends Component {
  state = {
    cinemaLocations: [],
    movieShowtime: []
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
          cinemaLocations: cinema
        });
      });
  }

  render() {
    const places = this.state.cinemaLocations.map((location, index) => (
      <CreateMarker
        lat={location.location.lat}
        lng={location.location.lon}
        name={location.name}
        key={index}
        id={location.id}
      />
    ));

    return (
      <UdacityNeighborhoodMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDCdankEOle73lu7TELdK0j-ssCMa3kaI&v=3&callback=initMap"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        center={{
          lat: 49.445421,
          lng: 11.08163
        }}
        defaultZoom={12}
        places={places}
      />
    );
  }
}
