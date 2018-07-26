import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";

export default class CreateInfoWindow extends Component {
  state ={
    movies: []
  }
// componentDidMount(){
//   let moviesFromCinema
//   fetch('https://api.internationalshowtimes.com/v4/movies/?cinema_id='+ this.props.id,{  
//         headers: {
     
//       "X-API-Key": "u0x0cqjLiqAq0jPCeZ0WSrqPFKVylLdV"    },
//   }).then(function(response) {
   
//     // Read the response as json.
//     return response.json();
//   })
//   .then(function(responseAsJson) {
//     // Do stuff with the JSON
//     // console.log(responseAsJson);
//     // cinema = responseAsJson
//     moviesFromCinema = responseAsJson.movies
//     console.log("ready")
//   })
//   .catch(function(error) {
//     console.log('Looks like there was a problem: \n', error);
//   })
//   .then(() => {
//     this.setState({
//       movies : moviesFromCinema
//     })
//   }
//   )
// }

  render() {
    const { name } = this.props;

    

    return (
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{name}</h1>

          {this.props.movies.map((movie) => 
            <p>{movie.title}</p>
          )}
         
          {/* <p> {this.state.movies[0].title}</p> */}



        </div>
      </InfoWindow>
    );
  }
}
