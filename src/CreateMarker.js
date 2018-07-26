import React, { Component } from "react";
import { Marker } from "react-google-maps";

import CreateInfoWindow from "./CreateInfoWindow";

export default class CreateMarker extends Component {
  state = {
    showTooltip: false
  };
  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  closeWindow() {
    this.setState({ showTooltip: false });
  }

  render() {
    const { showTooltip } = this.state;

    const { lat, lng, name } = this.props;

    return (
      <Marker
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
        onClick={this.clickTooltip.bind(this)}
      >
        {showTooltip && (
          <CreateInfoWindow
            name={name}
            closeWindow={this.closeWindow.bind(this)}
          />
        )}
      </Marker>
    );
  }
}
