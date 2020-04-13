import React from "react";
import Geocode from "react-geocode";

const {compose, withProps, lifecycle} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");


const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkTjWTcA3sD2wiyBr4SANvsdrtZfmv8rM&&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div
            style={{height: `600px`}}
            className="map-canvas"
            id="map-custom"
        />,
        mapElement: <div style={{height: `100%`, borderRadius: "inherit"}}/>
        ,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidUpdate() {
            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route({
                origin: new window.google.maps.LatLng(this.props.origin[0], this.props.origin[1]),
                destination: new window.google.maps.LatLng(this.props.destination[0], this.props.destination[1]),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={0}
        defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}


    >
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
    </GoogleMap>
);


export default Map
