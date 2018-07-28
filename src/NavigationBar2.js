import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";

export default class NavigationBar2 extends Component {
  state = {
    value: ""
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.filterLocations(event.target.value);
  }

  render() {
    return (
      <div className="navigation-bar">
        <nav>
          <ul>
            <li>
              <input
                type="text"
                value={this.state.value}
                className="search-list"
                onChange={this.handleChange.bind(this)}
              />
            </li>
            <div>
              {this.props.cinemaLocationsFilterd.map(cinema => (
                <li>{cinema.name}</li>
              ))}
            </div>

            <div />
          </ul>
        </nav>
      </div>
    );
  }
}
