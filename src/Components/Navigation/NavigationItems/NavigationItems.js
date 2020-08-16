import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems =(props) =>
{
    return (
        <ul className={classes.NavigationItems} >
            <NavigationItem link="/builders" Clicked={props.Clicked}>Builders</NavigationItem>
            <NavigationItem link="/my-orders" Clicked ={props.Clicked}>My Orders</NavigationItem>
        </ul>
    );
}

export default navigationItems;