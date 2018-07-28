import React, { Component } from "react";

export default class NavigationBar extends Component {
  state = {
    query: "test"
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  render() {
    return (
      <div>
        <nav>
          <div id="menuToggle">
            {/* <div> */}
            {/* 
    A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it.
     */}
            <input type="checkbox" className="toogle-button" />

            {/* 
    Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff.
     */}
            <span />
            <span />
            <span />
            {/* </div> */}
            {/* 
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
     */}
            {/* <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          /> */}

            {/* <p>resr</p> */}
            {/* <input type="text" value={this.state.query} onChange={this.handleChange} /> */}

            <ul id="menu">
              <li>
                <input
                  type="text"
                  value={this.state.query}
                  className="search-list"
                />
              </li>

              {/* <input type="text" name="FirstName" value="Mickey"> */}

              {/* <div id= 'menu-list' > */}
<div>
              {this.props.cinemaLocations.map(cinema => <li>{cinema.name}</li>)}
              </div>

              {/* </div> */}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
