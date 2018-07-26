import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";

export default class CreateInfoWindow extends Component {
  render() {
    const { name } = this.props;

    return (
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{name}</h1>
        </div>
      </InfoWindow>
    );
  }
}
