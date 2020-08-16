import React from 'react';
import Logo from '../../Assets/Images/logo.png';
import classes from './Logo.css';

const logo = (props) =>
{
    return(
        <div className={classes.Logo}>
            <img src = {Logo} alt="Restaurant Management System" onClick={props.Clicked} onDoubleClick={props.gotoLogin}/>
        </div>
    );
}
export default logo;