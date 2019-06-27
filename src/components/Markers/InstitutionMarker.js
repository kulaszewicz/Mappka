import React from 'react'
import {Marker} from  'react-google-maps'

import InstitutionModal from "./Modals/InstitutionModal";



export default class InstitutionMarker extends React.Component {
    state = {
        apiArray: [],
        markerArray: [],
        currMarkerArray: undefined,

        id: undefined,
        name: undefined,
        city: undefined,
        address: undefined,
        ocp: undefined,
        type: undefined,
        img: undefined
    };

    handleGetEvents = (db) => {
        this.setState(() => ({
            apiArray: db
        }), () => {
            //console.log(this.state.apiArray);
            this.handleMarkerStyle();
        })
    };


    handleMarkerStyle = () => {
        let tempArr = [];
        for(let event of this.state.apiArray) {
            if (this.props.markerStyle === 'morning'){
                if(event.ocp >= 0 && event.ocp < 31)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.morning.low));
                else if (event.ocp >= 31 && event.ocp < 71)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.morning.medium));
                else if(event.ocp >= 71 && event.ocp <= 100)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.morning.high));
            } else if (this.props.markerStyle === 'day'){
                if(event.ocp >= 0 && event.ocp < 31)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.day.low));
                else if(event.ocp >= 31 && event.ocp < 71)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.day.medium));                                               else if(event.ocp >= 71 && event.ocp <= 100)
                        tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.day.high));
            } else if (this.props.markerStyle === 'evening'){
                if(event.ocp >= 0 && event.ocp < 31)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.evening.low));
                else if(event.ocp >= 31 && event.ocp < 71)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.evening.medium));                                           else if(event.ocp >= 71 && event.ocp <= 100)
                        tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.evening.high));
            } else if (this.props.markerStyle === 'night'){
                if(event.ocp >= 0 && event.ocp < 31)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.night.low));
                else if(event.ocp >= 31 && event.ocp < 71)
                    tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.night.medium));                                             else if(event.ocp >= 71 && event.ocp <= 100)
                        tempArr.push(this.handleSetMarkerArrayWithImg(event, this.props.markerImgs.night.high));
            }
        }
        this.setState(() => ({
            currMarkerArray: tempArr
        }),() => {
            this.handleRenderMarkers();
        })
    };

    handleRenderMarkers = () => {
        let tempArr = [];
        for (let event of this.state.currMarkerArray){
            tempArr.push(<Marker
                key={event.id}
                icon={{url: event.markerIcon, scaledSize:{width:48, height:48}}}
                position={{ lat: event.lat, lng: event.lng }}
                onClick={() => {this.handleModals(event.id,
                    event.name,
                    event.ocp,
                    event.city,
                    this.handleGetAddress(event.street,
                        event.building,
                        event.flat,
                        event.zipcode),
                    event.image,
                    event.type
                )}}
            />)
        }
        this.setState(() => ({
            markerArray: tempArr
        }), () => {
            //console.log(this.state.markerArray);
        })

    };

    handleGetAddress = (street, building, flat, zipcode) => {
        return `${street} ${building} ${flat} ${zipcode}`
    };


    handleSetMarkerArrayWithImg = (obj, markerIcon) => {
        return {
            building: obj.building,
            city: obj.city,
            flat: obj.flat,
            id: obj.id,
            image: obj.image,
            lat: obj.lat,
            lng: obj.lng,
            markerIcon: markerIcon,
            name: obj.name,
            ocp: obj.ocp,
            street: obj.street,
            type: obj.type,
            zipcode: obj.zipcode
        }
    };

    handleModals = (id, name, ocp, city, address, img, type) => {
        this.setState(() => ({
            id: id,
            ocp: ocp,
            name: name,
            city: city,
            address: address,
            img: img,
            type: type
        }), () => {
            //console.log(this.state);
            this.props.handleToggleModal('marker');
        })
    };

    componentDidMount(){
        this.handleGetEvents(this.props.markerDB);
    }

    render(){
        return(
            <div>{this.state.markerArray}
                <InstitutionModal key={this.state.id}
                                  markerModal={this.props.markerModal}
                                  handleToggleModal={this.props.handleToggleModal}
                                  id={this.state.id}
                                  name={this.state.name}
                                  city={this.state.city}
                                  address={this.state.address}
                                  ocp={this.state.ocp}
                                  type={this.state.type}
                                  img={this.state.img}
                />
            </div>

        )
    }
}

//