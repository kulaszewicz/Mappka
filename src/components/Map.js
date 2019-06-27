import React from 'react'

import {compose, withProps, withState, withHandlers} from 'recompose'
import {withScriptjs ,withGoogleMap, GoogleMap} from "react-google-maps"


import beachDB from '../tempDB/beach'
import clinicDB from '../tempDB/clinic'
import clubDB from '../tempDB/club'
import eventDB from '../tempDB/event'
import foodDB from '../tempDB/food'
import officeDB from '../tempDB/office'
import parkingDB from '../tempDB/parking'
import sorDB from '../tempDB/sor'

import EventMarker from './Markers/EventMarker'
import InstitutionMarker from './Markers/InstitutionMarker'
import SimpleMarker from './Markers/SimpleMarker'



const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        isMarkerShown: true,
    }),
    withState('zoom', 'onZoomChange', 14),
    withHandlers(() => {
        const refs = {
            map: undefined,
        };

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onZoomChanged: ({ onZoomChange }) => () => {
                onZoomChange(console.log(refs.map.getZoom()))
            }
        }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 54.5201335, lng: 18.5272539 }}
        zoom={props.zoom}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
        defaultOptions={{
            disableDefaultUI: true,
            draggable: true,
            keyboardShortcuts: false,
            scaleControl: true,
            scrollwheel: true,
            styles: props.mapStyle
        }}
    >
        <EventMarker
            markerDB={eventDB}
            markerImgs={markerIconBundler('OTD', 'event')}

            handleToggleModal={props.handleToggleModal}
            markerModal={props.markerModal}
            markerStyle={props.markerStyle}
        />

        <InstitutionMarker
            markerDB={clinicDB}
            markerImgs={markerIconBundler('TAOD', 'clinic')}

            handleToggleModal={props.handleToggleModal}
            markerModal={props.markerModal}
            markerStyle={props.markerStyle}
        />
        <InstitutionMarker
            markerDB={clubDB}
            markerImgs={markerIconBundler('TAOD', 'club')}


            handleToggleModal={props.handleToggleModal}
            markerModal={props.markerModal}
            markerStyle={props.markerStyle}
        />

        <InstitutionMarker
            markerDB={foodDB}
            markerImgs={markerIconBundler('TAOD', 'food')}


            handleToggleModal={props.handleToggleModal}
            markerModal={props.markerModal}
            markerStyle={props.markerStyle}
        />

        <InstitutionMarker
            markerDB={officeDB}
            markerImgs={markerIconBundler('TAOD', 'office')}


            handleToggleModal={props.handleToggleModal}
            markerModal={props.markerModal}
            markerStyle={props.markerStyle}
        />

        <InstitutionMarker
            markerDB={sorDB}
            markerImgs={markerIconBundler('TAOD', 'sor')}


            handleToggleModal={props.handleToggleModal}
            markerModal={props.markerModal}
            markerStyle={props.markerStyle}
        />

        <SimpleMarker
            markerDB={beachDB}
            markerImgs={markerIconBundler('TAOD', 'beach')}
            markerStyle={props.markerStyle}
        />

        <SimpleMarker
            markerDB={parkingDB}
            markerImgs={markerIconBundler('TAOD', 'parking')}
            markerStyle={props.markerStyle}
        />






    </GoogleMap>
);

export default Map;

const markerIconBundler = (type, name) => {
    if (type === 'OTD') { //ONLY TIME DEPENDENT
        return {
            morning: require(`../assets/markers/morning/${name}.svg`),
            day: require(`../assets/markers/day/${name}.svg`),
            evening: require(`../assets/markers/evening/${name}.svg`),
            night: require(`../assets/markers/night/${name}.svg`),
        }
    } else if (type === 'TAOD'){ //TIME AND OCCUPATION DEPENDENT
        return {
            morning: {
                low: require(`../assets/markers/morning/${name}/${name}G.svg`),
                medium: require(`../assets/markers/morning/${name}/${name}Y.svg`),
                high: require(`../assets/markers/morning/${name}/${name}R.svg`)
            },
            day: {
                low: require(`../assets/markers/day/${name}/${name}G.svg`),
                medium: require(`../assets/markers/day/${name}/${name}Y.svg`),
                high: require(`../assets/markers/day/${name}/${name}R.svg`)
            },
            evening: {
                low: require(`../assets/markers/evening/${name}/${name}G.svg`),
                medium: require(`../assets/markers/evening/${name}/${name}Y.svg`),
                high: require(`../assets/markers/evening/${name}/${name}R.svg`)
            },
            night: {
                low: require(`../assets/markers/night/${name}/${name}G.svg`),
                medium: require(`../assets/markers/night/${name}/${name}Y.svg`),
                high: require(`../assets/markers/night/${name}/${name}R.svg`)
            }
        }
    }
};



