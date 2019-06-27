import React from 'react'


const Logo = (props) => (
    <div className={'logo-holder'}>
        <img src={props.img} className={'logo'} alt={'logo'}/>
    </div>
);

export default Logo