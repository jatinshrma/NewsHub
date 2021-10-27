import React from 'react'
import Spinner from './spinner.gif'

const spinner = (props) => {

    const { position } = props;
    
    return (
        <div className='text-center my-3' style={position === "top" ? { position: 'absolute', top: "50%", left: "50%" } : {}}>
            <img src={Spinner} alt="loding icon" />
        </div>
    )
}

export default spinner;
