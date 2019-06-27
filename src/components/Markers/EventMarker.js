import React from 'react'

import {Marker} from  'react-google-maps'

import EventModal from './Modals/EventModal'

export default class EventMarker extends React.Component {
    state = {
        apiArray: [],
        markerArray: [],
        currMarkerStyle: undefined,

        id: undefined,
        name: undefined,
        date: undefined,
        time: undefined,
        url: undefined,
        desc: undefined,
        img: undefined
    };

    handleGetEvents = (db) => {
        this.setState(() => ({
            apiArray: db
        }), () => {
           // console.log(this.state.apiArray);
            this.handleRenderMarkers();
        })
    };


    handleRenderMarkers = () => {
        let tempArr = [];
        for (let event of this.state.apiArray){
            tempArr.push(<Marker key={event.id}
                                 icon={{url: this.state.currMarkerStyle, scaledSize:{width:48, height:48}}}
                                 position={{ lat: event.lat, lng: event.lng }}
                                 onClick={() => {this.handleModals(event.id,
                                     event.name,
                                     this.handleGetProperDate(event.date),
                                     `${event.time.hours}:${event.time.minutes}`,
                                     event.url,
                                     event.desc,
                                     event.img
                                     )}}

            />)
        }
        this.setState(() => ({
            markerArray: tempArr
        }), () => {
           // console.log(this.state.markerArray);
        })

    };

    handleGetProperDate = (date) => {
        const day = date.slice(8,10);
        let month = date.slice(5,7);
        if (month === '01'){
            month='styczeń'
        } else if(month === '02'){
            month='luty'
        }else if(month === '03'){
            month='marzec'
        }else if(month === '04'){
            month='kwiecień'
        }else if(month === '05'){
            month='maj'
        }else if(month === '06'){
            month='czerwiec'
        }else if(month === '07'){
            month='lipiec'
        }else if(month === '08'){
            month='sierpień'
        }else if(month === '09'){
            month='wrzesień'
        }else if(month === '10'){
            month='pazdziernik'
        }else if(month === '11'){
            month='listopad'
        }else if(month === '12'){
            month='grudzień'
        }

        return `${month} ${day}`;
    };

    handleMarkerStyle = () => {
        if (this.props.markerStyle === 'morning'){
            this.setState(() => ({
                currMarkerStyle: this.props.markerImgs.morning
            }))
        } else if (this.props.markerStyle === 'day'){
            this.setState(() => ({
                currMarkerStyle: this.props.markerImgs.day
            }))
        } else if (this.props.markerStyle === 'evening'){
            this.setState(() => ({
                currMarkerStyle: this.props.markerImgs.evening
            }))
        } else if (this.props.markerStyle === 'night'){
            this.setState(() => ({
                currMarkerStyle: this.props.markerImgs.night
            }))
        }
    };

    handleModals = (id, name, date, time, url, desc, img) => {
        this.setState(() => ({
            id: id,
            name: name,
            date: date,
            time: time,
            url: url,
            desc: desc,
            img: img
        }), () => {
            this.props.handleToggleModal('marker');
        })
    };

    componentDidMount(){
        this.handleGetEvents(this.props.markerDB);
        this.handleMarkerStyle();
    }

    render(){
        return(
          <div>
              {this.state.markerArray}
              <EventModal key={this.state.id}
                          markerModal={this.props.markerModal}
                          handleToggleModal={this.props.handleToggleModal}
                          id={this.state.id}
                          name={this.state.name}
                          date={this.state.date}
                          time={this.state.time}
                          url={this.state.url}
                          desc={this.state.desc}
                          img={this.state.img}
              />
          </div>
        )
    }
}

//