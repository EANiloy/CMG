import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) =>
{
    return(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked ={props.drawerToggleClicked}/>
        {props.isAuth?<nav>
        <NavigationItem link="/signedout" Clicked={props.logout}>Logout</NavigationItem>
        </nav>:null}
        <div className ={classes.Logo}>
        <Logo Clicked={props.goHome} gotoLogin={props.signin}/>
        </div>
        <nav className={classes.DesktopOnly}>
        <NavigationItems/>
        </nav>
    </header>
    );
}

export default toolbar;