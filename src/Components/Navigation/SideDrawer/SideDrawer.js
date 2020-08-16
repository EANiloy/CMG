import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../hoc/Auxiliary';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
const sideDrawer = (props) =>
{
    let attachClasses = [classes.SideDrawer,classes.Close]
    if(props.open)
    {
        attachClasses = [classes.SideDrawer,classes.Open]
    }
    return(
        <Auxilliary>
        <Backdrop  show={props.open} clicked ={props.closed}/>
        <div className ={attachClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo Clicked={props.goHome} gotoLogin={props.signin}/>
            </div>
            <hr className={classes.Hl}></hr>
            <nav>
                <NavigationItems isAuth={props.isAuth} Clicked={props.closed}/>
                {!props.isAuth ? 
                <NavigationItem link="/signin" Clicked={()=>{props.signin();props.closed()}} >Sign in</NavigationItem> 
                :
                <Auxilliary>
                <NavigationItem link="/signin" Clicked={()=>{props.signin();props.closed()}}>Panel</NavigationItem> 
                <NavigationItem link="/signedout" Clicked={()=>{props.logout();props.closed()}}>Logout</NavigationItem>
                        </Auxilliary>}
            </nav>
        </div>
        </Auxilliary>
    );
}

export default sideDrawer;

