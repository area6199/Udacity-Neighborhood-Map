import escapeRegExp from "escape-string-regexp";
react-google-maps

# Udacity-Neighborhood-Map


## Table of Contents

* [Application description](#Application description)
* [How to start the App](#How to start the App)
* [How to run a production build in order to test the service worker](#How to run a production build in order to test the service worker)
* [Code dependencies](#Code dependencies)



## Application description
This application shows cinema near to nuremberg and the movies which are currently playing.

## How to start the App
You have to run npm install and npm start in your console to get the app it installed and launched. After that you have to open your browser and navigate normally to http://localhost:3000.

## How to run a production build in order to test the service worker
You have to run npm run build in your console. After that you have to run serve -s build to see the result in your browser normally under http://localhost:5000.

## Code dependencies
This app is build with react (https://reactjs.org/) and uses escapeRegExp (https://www.npmjs.com/package/escape-string-regexp) for filtering. Googlemaps is integrated using react-google-maps (https://www.npmjs.com/package/react-google-maps).
