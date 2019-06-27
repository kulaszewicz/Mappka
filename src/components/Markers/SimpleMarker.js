import React from 'react'

import {Marker} from  'react-google-maps'


export default class SimpleMarker extends React.Component {
    state = {
        apiArray: [],
        markerArray: [],
        currMarkerArray: undefined
    };

    handleGetEvents = (db) => {
        this.setState(() => ({
            apiArray: db
        }), () => {
            //console.log(this.state.apiArray);
            this.handleMarkerStyle();
        })
    };


    handleRenderMarkers = () => {
        let tempArr = [];
        for (let event of this.state.currMarkerArray){
            tempArr.push(<Marker key={event.id} icon={{url: event.img, scaledSize:{width:48, height:48}}} position={{ lat: event.lat, lng: event.lng }} />)
        }
        this.setState(() => ({
            markerArray: tempArr
        }), () => {
            //console.log(this.state.markerArray);
        })

    };

    handleMarkerStyle = () => {
        let tempArr = [];
        for(let event of this.state.apiArray) {
            if (this.props.markerStyle === 'morning'){
                if(event.ocp >= 0 && event.ocp < 31){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.morning.low})
                } else if(event.ocp >= 31 && event.ocp < 71){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.morning.medium})
                }else if(event.ocp >= 71 && event.ocp <= 100){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.morning.high})
                }
            } else if (this.props.markerStyle === 'day'){
                if(event.ocp >= 0 && event.ocp < 31){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.day.low})
                } else if(event.ocp >= 31 && event.ocp < 71){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.day.medium})
                }else if(event.ocp >= 71 && event.ocp <= 100){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.day.high})
                }
            } else if (this.props.markerStyle === 'evening'){
                if(event.ocp >= 0 && event.ocp < 31){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.evening.low})
                } else if(event.ocp >= 31 && event.ocp < 71){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.evening.medium})
                }else if(event.ocp >= 71 && event.ocp <= 100){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.evening.high})
                }
            } else if (this.props.markerStyle === 'night'){
                if(event.ocp >= 0 && event.ocp < 31){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.night.low})
                } else if(event.ocp >= 31 && event.ocp < 71){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.night.medium})
                }else if(event.ocp >= 71 && event.ocp <= 100){
                    tempArr.push({id: event.id, lat: event.lat, lng: event.lng, img: this.props.markerImgs.night.high})
                }
            }
        }
        this.setState(() => ({
            currMarkerArray: tempArr
        }),() => {
            this.handleRenderMarkers();
        })
    };

    componentDidMount(){
        this.handleGetEvents(this.props.markerDB);
    }

    render(){
        return(
            <div>{this.state.markerArray}</div>
        )
    }
}

//