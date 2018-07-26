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
    ],
    cinemaLocations: [],
    movieShowtime: []
  };
  componentDidMount(){
   let cinema
  //  let index
  //  let movieShowtime

  fetch('https://api.internationalshowtimes.com/v4/cinemas/?location=49.445421,11.081630&distance=10',{  
        headers: {
     
      "X-API-Key": "u0x0cqjLiqAq0jPCeZ0WSrqPFKVylLdV"    },
  })
  .then(function(response) {
   
    // Read the response as json.
    return response.json();
  })
  .then(function(responseAsJson) {
    // Do stuff with the JSON
    // console.log(responseAsJson)
    cinema = responseAsJson.cinemas
    
  })
  .catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
  })
  .then(() => {
    this.setState({
      cinemaLocations : cinema
    })
  }
  )


  // .then(() => {
  //   this.state.cinemaLocations.forEach((element) => {
  //     // index = i
  //     fetch('https://api.internationalshowtimes.com/v4/movies/?cinema_id='+ element.id,{  
  //       headers: {
     
  //     "X-API-Key": "u0x0cqjLiqAq0jPCeZ0WSrqPFKVylLdV"    },
  // }).then(function(response) {
   
  //   // Read the response as json.
  //   return response.json();
  // })
  // .then(function(responseAsJson) {
  //   // Do stuff with the JSON
  //   console.log(responseAsJson);
  //   // cinema = responseAsJson
  //   this.setState({
  //     movieShowtime : responseAsJson.movies
  //   })
  // })
  // .catch(function(error) {
  //   console.log('Looks like there was a problem: \n', error);
  // })
  //   });
  // }
  // )


  }

  render() {


    const places = this.state.cinemaLocations.map((location, index) => (
      <CreateMarker
        lat={location.location.lat}
        lng={location.location.lon}
        name={location.name}
        key={index}
        id = {location.id}
      />
    ));
    // const places = this.state.locations.map((location, index) => (
    //   <CreateMarker
    //     lat={location.location.lat}
    //     lng={location.location.lng}
    //     name={location.title}
    //     key={index}
    //   />
    // ));

    return (
      <UdacityNeighborhoodMap
     
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDCdankEOle73lu7TELdK0j-ssCMa3kaI&v=3&callback=initMap"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        center={{
          lat: 49.445421,
          lng: 11.081630
        }}
        defaultZoom = {12}
        places={places}
      />
    );
  }
}
