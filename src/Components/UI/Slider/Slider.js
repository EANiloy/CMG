import React from 'react';
import classes from './Slider.css';
import ImgComp from './ImageComp';
import i1 from '../../../Assets/Images/Home/1.jpg'
import i2 from '../../../Assets/Images/Home/2.jpg'
import i3 from '../../../Assets/Images/Home/3.jpg'
import i4 from '../../../Assets/Images/Home/4.jpg'
import i5 from '../../../Assets/Images/Home/5.jpg'
import i6 from '../../../Assets/Images/Home/6.jpg'
import i7 from '../../../Assets/Images/Home/7.jpg'
import i8 from '../../../Assets/Images/Home/8.jpg'
import i9 from '../../../Assets/Images/Home/9.jpg'
import i10 from '../../../Assets/Images/Home/10.jpg'
import i11 from '../../../Assets/Images/Home/11.jpg'

const Slider = () =>
{
    const images = [
        <ImgComp src={i1}/>,
        <ImgComp src={i2} />,
        <ImgComp src={i3} />,
        <ImgComp src={i4} />,
        <ImgComp src={i5} />,
        <ImgComp src={i6} />,
        <ImgComp src={i7} />,
        <ImgComp src={i8} />,
        <ImgComp src={i9} />,
        <ImgComp src={i10} />,
        <ImgComp src={i11} />,

    ]
    return(
        <div className ={classes.Slider}>
            {
                images.map((item,index)=>{
                
                    return(
                        <div key = {index} className = {classes.Slide}>
                            {item}
                        </div>
                    );
                }
            )}
        </div>
    );

}

export default Slider;