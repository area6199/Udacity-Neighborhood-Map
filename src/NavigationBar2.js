import React, { Component } from "react";

export default class NavigationBar2 extends Component {
  state = {
    value: ""
  };
  // handles the input data for filtering
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.filterLocations(event.target.value);
  }

  closeInfoWindow(event) {
    this.props.setStateOfcinemaLocations(event.target.id, false);
  }

  showInfoWindow(event) {
    this.props.cinemaLocationsFilterd.forEach(element => {
      this.props.setStateOfcinemaLocations(element.id, false);
    });
    this.props.setStateOfcinemaLocations(event.target.id, true);
  }

  setFocusToInfoWindow(evt){
    if (evt.which === 9) {
      document.getElementsByClassName("info-window-details-headline")[0].focus()
    }
  }

  render() {
    return (
      <div className="navigation-bar">
        <nav>
          <ul>
            <li id="search-cinemas-li">
              <input
                type="text"
                value={this.state.value}
                id="search-cinemas-input"
                onChange={this.handleChange.bind(this)}
                placeholder="Search cinemas"
              />
            </li>
            <div>
              {typeof this.props.cinemaLocationsFilterd !== "undefined" &&
                this.props.cinemaLocationsFilterd.map((cinema, index) => (
                  <li
                    tabIndex="0"
                    className="filtered-cinemas"
                    id={cinema.id}
                    key={index}
                    onMouseOver={this.showInfoWindow.bind(this)}
                    onFocus={this.showInfoWindow.bind(this)}
                    onMouseOut={this.closeInfoWindow.bind(this)}
                    onKeyDown={this.setFocusToInfoWindow}
                  >
                    {cinema.name}
                  </li>
                ))}
            </div>
            <div />
          </ul>
          <p className="data-from">
            Data from:{" "}
            <a tabIndex={-1} href="https://www.internationalshowtimes.com/">
              {" "}
              www.internationalshowtimes.com
            </a>{" "}
          </p>
        </nav>
      </div>
    );
  }
}
