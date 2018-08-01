import React, { Component } from "react";
import { Marker } from "react-google-maps";
import CreateInfoWindow from "./CreateInfoWindow";

export default class CreateMarker extends Component {
  state;
  showInfoWindow = () => {
    this.props.cinemaLocations.forEach(element => {
      this.props.setStateOfcinemaLocations(element.id, false);
    });
    this.props.setStateOfcinemaLocations(this.props.id, true);
  };

  closeInfoWindow() {
    this.props.setStateOfcinemaLocations(this.props.id, false);
  }

  render() {
    const { lat, lng, name, id, icon } = this.props;

    return (
      <div>
        <Marker
          position={{
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          }}
          onClick={this.showInfoWindow.bind(this)}
          icon={icon}
        >
          {typeof this.props.cinemaLocations[this.props.index]
            .showInfowWindow !== "undefined" &&
            (this.props.cinemaLocations[this.props.index].showInfowWindow ===
              true && (
              <CreateInfoWindow
                name={name}
                id={this.props.index}
                key={id}
                closeInfoWindow={this.closeInfoWindow.bind(this)}
                movies={this.props.cinemaLocations[this.props.index].movies}
                cinemaLocations={this.props.cinemaLocations}
              />
            ))}
        </Marker>
      </div>
    );
  }
}
