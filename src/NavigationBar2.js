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
            <li id= 'search-cinemas-li'>
              <input
                type="text"
                value={this.state.value}
                id="search-cinemas-input"
                onChange={this.handleChange.bind(this)}
                placeholder='Search cinemas'

              />
            </li>
            <div>
              {this.props.cinemaLocationsFilterd.map(cinema => (
                <li className= 'filtered-cinemas'>{cinema.name}</li>
              ))}
            </div>

            <div />
          </ul>
        </nav>
      </div>
    );
  }
}
