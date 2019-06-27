import React from 'react'
import Modal from 'react-modal';

const InstitutionModal = (props) => (
    <div>
        <Modal
            isOpen={props.markerModal}
            onRequestClose={()=>{props.handleToggleModal('marker')}}
            contentLabel="Institution Modal"
            className={'modal'}

        >
            <div className={'modal-container'}>
                <div className={'modal-header'}>
                    <img className={'modal-img'} src={props.img} alt={'modal-img'}/>
                    <h1 className={'modal-name'}>{props.name}</h1>
                </div>
                <div className={'modal-list'}>
                    <h3 className={'modal-date'}>Miasto: {props.city}</h3>
                    <h3 className={'modal-time'}>Adres: {props.address}</h3>
                    <h4 className={'modal-desc'}>Procent zapełnienia: {props.ocp}%</h4>
                    <span className={'modal-desc'}>{props.type}</span>
                </div>
                <button className={'modal-close-ok'} onClick={()=>{props.handleToggleModal('marker')}} >Ok</button>
            </div>
        </Modal>
    </div>
);

export default InstitutionModal