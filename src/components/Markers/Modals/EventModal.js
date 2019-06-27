import React from 'react'
import Modal from 'react-modal';

const EventModal = (props) => (
    <div>
        <Modal
            isOpen={props.markerModal}
            onRequestClose={()=>{props.handleToggleModal('marker')}}
            contentLabel="Event Modal"
            className={'modal'}

        >
            <div className={'modal-container'}>
                <div className={'modal-header'}>
                    <img className={'modal-img'} src={props.img} alt={'modal-img'}/>
                    <h1 className={'modal-name'}>{props.name}</h1>
                </div>
                <div className={'modal-list'}>
                    <h3 className={'modal-date'}>{props.date}</h3>
                    <h3 className={'modal-date'}>{props.time}</h3>
                    <span className={'modal-desc'}>{props.desc}</span>
                </div>
                <button className={'modal-close-ok'} onClick={()=>{props.handleToggleModal('marker')}} >Ok</button>
            </div>
        </Modal>
    </div>
);

export default EventModal
