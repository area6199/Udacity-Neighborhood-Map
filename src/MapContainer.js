import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import CreateMarker from "./CreateMarker";

// creact map
const UdacityNeighborhoodMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultCenter={props.center} defaultZoom={props.defaultZoom}>
      {props.places}
    </GoogleMap>
  ))
);

export default class MapContainer extends Component {
  render() {
    // create marker for each cinema
    const places =
      typeof this.props.cinemaLocations !== "undefined" &&
      this.props.cinemaLocations.map((location, index) => (
        <CreateMarker
          lat={location.location.lat}
          lng={location.location.lon}
          name={location.name}
          key={index}
          index={index}
          id={location.id}
          setStateOfcinemaLocations={this.props.setStateOfcinemaLocations}
          cinemaLocations={this.props.cinemaLocations}
          showError={this.props.showError}
          handleErrors={this.props.handleErrors}
        />
      ));

    return (
      <div ref={elem => (this.mapEl = elem)} className="map-container">
        <UdacityNeighborhoodMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDCdankEOle73lu7TELdK0j-ssCMa3kaI&v=3"
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
      </div>
    );
  }
}
