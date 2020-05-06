import React from "react";
import Geocode from "react-geocode";
import {withStateHandlers} from "recompose";

const {compose, withProps, lifecycle} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle
} = require("react-google-maps");

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTJckDGDyHM8cZ9R-PKUIQGHgfhoXzzFA&v=3.exp&libraries=places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withStateHandlers(() => ({
        iconUrl: "https://cdn.iconscout.com/icon/free/png-64/box-package-parcel-logistic-delivery-track-navigation-6-20427.png",
    }), {
        onMarkerClick: () => () => ({
            iconUrl: "https://cdn.iconscout.com/icon/free/png-64/box-package-parcel-logistic-delivery-track-navigation-6-20427.png",
        })
    }),
    withScriptjs,
    withGoogleMap
)(props => (

    <GoogleMap defaultZoom={14} defaultCenter={{lat: props.position.latitude, lng: props.position.longitude}}>
        <Marker onClick={props.onMarkerClick}
                icon={{url: props.iconUrl}}
                position={{lat: props.position.latitude, lng: props.position.longitude}}/>
        <Circle
            defaultCenter={{lat: props.position.latitude, lng: props.position.longitude}}
            defaultRadius={500}
            options={{
                strokeColor: '#0022ff',
                fillColor: '#0099ff',
                fillOpacity: 0.1
            }}
        />
    </GoogleMap>
));

export default MyMapComponent
