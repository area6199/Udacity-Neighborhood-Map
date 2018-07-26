import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import CreateMarker from "./CreateMarker";

// const UdacityNeighborhoodMap = withScriptjs(withGoogleMap(props => (
//   <GoogleMap
//   // google={props.google}
//   zoom={1}
//     >
//     {props.places}
//     </GoogleMap>

// )));

const UdacityNeighborhoodMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultCenter={props.center} defaultZoom={props.defaultZoom}>
      {props.places}
      {/* {<Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
    </GoogleMap>
  ))
);

export default class MapContainer extends Component {
  state = {
    locations: [
      {
        title: "Park Ave Penthouse",
        location: { lat: 40.7713024, lng: -73.9632393 }
      },
      {
        title: "Chelsea Loft",
        location: { lat: 40.7444883, lng: -73.9949465 }
      },
      {
        title: "Union Square Open Floor Plan",
        location: { lat: 40.7347062, lng: -73.9895759 }
      },
      {
        title: "East Village Hip Studio",
        location: { lat: 40.7281777, lng: -73.984377 }
      },
      {
        title: "TriBeCa Artsy Bachelor Pad",
        location: { lat: 40.7195264, lng: -74.0089934 }
      },
      {
        title: "Chinatown Homey Space",
        location: { lat: 40.7180628, lng: -73.9961237 }
      }
    ]
  };

  render() {
    //     const style = {
    //   width  : "100vw",
    //   height: "100vh"
    // };

    const places = this.state.locations.map((location, index) => (
      <CreateMarker
        lat={location.location.lat}
        lng={location.location.lng}
        name={location.title}
        key={index}
      />
    ));

    return (
      <UdacityNeighborhoodMap
     
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDCdankEOle73lu7TELdK0j-ssCMa3kaI&v=3&callback=initMap"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        center={{
          lat: this.state.locations[0].location.lat,
          lng: this.state.locations[0].location.lng
        }}
        defaultZoom = {12}
        places={places}
      />
    );
  }
}
