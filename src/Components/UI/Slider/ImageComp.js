import React from 'react';


const Imgcomp = ({src}) =>
{
    let imgStyles={
        width:100+"%",
        height:100+"%"
        }
    return(
        <img src={src} alt="Slide-Images" style={imgStyles}/>
    )
}

export default Imgcomp;