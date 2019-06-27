import React from 'react'
import Modal from 'react-modal';
import Map from './Map'
import Logo from './Logo'

// Logos
import morningLogo from '../assets/images/logoMorning.svg'
import dayLogo from '../assets/images/logoDay.svg'
import eveningLogo from '../assets/images/logoEvening.svg'
import nightLogo from '../assets/images/logoNight.svg'

// Map styles
import morningStyle from '../assets/mapStyle/Morning'
import dayStyle from '../assets/mapStyle/Day'
import eveningStyle from '../assets/mapStyle/Evening'
import nightStyle from '../assets/mapStyle/Night'


Modal.setAppElement('#app');

export default class MapifyApp extends React.Component {
    state = {
        currLogo: undefined,
        currMapStyle: undefined,
        currTime: undefined,
        currMarkerStyle: undefined,
        markerModal:false,
    };

    handleToggleModal = (modal) => {
        this.setState((prevState) => ({
            [`${modal}Modal`] : !prevState[`${modal}Modal`]
        }))
    };


    handleAppStyle = () => {
        if (this.state.currTime >= 10.00 && this.state.currTime <= 17.59) {
            this.setState(() => ({
                currLogo: dayLogo,
                currMapStyle: dayStyle,
                currMarkerStyle: 'day'
            }))
        } else if (this.state.currTime >= 18.00 && this.state.currTime <= 21.59){
            this.setState(() => ({
                currLogo: eveningLogo,
                currMapStyle: eveningStyle,
                currMarkerStyle: 'evening'
            }))
        } else if (this.state.currTime >= 22.00 || this.state.currTime >= 0.00 && this.state.currTime <= 4.59){
            this.setState(() => ({
                currLogo: nightLogo,
                currMapStyle: nightStyle,
                currMarkerStyle: 'night'
            }))
        } else if (this.state.currTime >= 5.00 && this.state.currTime <= 9.59){
            this.setState(() => ({
                currLogo: morningLogo,
                currMapStyle: morningStyle,
                currMarkerStyle: 'morning'
            }))
        }
    };

    handleGetTime = () => {
      const time = new Date();
      const currTime = time.getHours() + (time.getMinutes()*0.01);
      this.setState(() => ({
          currTime: currTime
      }), () => {
          console.log(this.state.currTime);
          this.handleAppStyle();
      })
    };

    componentDidMount(){
        this.handleAppStyle();
        this.handleGetTime();
    }

    render() {
        return (
            <div>
                <Map
                    markerStyle={this.state.currMarkerStyle}
                    mapStyle={this.state.currMapStyle}
                    // Modals
                    handleToggleModal={this.handleToggleModal}
                    markerModal={this.state.markerModal}
                />
                <Logo img={this.state.currLogo}/>

            </div>
        )
    }
}