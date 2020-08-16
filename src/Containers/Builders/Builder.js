import React, { Component } from 'react';
import classes from './Builder.css';
import Pizza from '../../Assets/Images/Builders/pizza.png';
import Burger from '../../Assets/Images/Builders/burger.png';
import {withRouter} from 'react-router'
class Builder extends Component
{
    gotoBurgerBuilder = ()=>
    {
        return(
            this.props.history.push('/burgerbuilder')
        );
    }
    gotoPizzaBuilder = ()=>
    {
        return(
            this.props.history.push('/pizzabuilder')
        );
    }
    render()
    {
        return(
            <div className ={classes.Content}>
                <div className={classes.Pizza}>
                    <img className={classes.Pics} src = {Pizza} alt ="Pizza Builder"/>
                    <div className={classes.Buttons}>
                    <button className={classes.Btn1} onClick={this.gotoPizzaBuilder}>Pizza Builder</button>
                    </div>
                </div>
                <div className = {classes.Burger}>
                    <img className={classes.Pics} src={Burger} alt="Burger Builder" />
                    <div className={classes.Buttons}>
                    <button className={classes.Btn2} onClick={this.gotoBurgerBuilder}>Burger Builder</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Builder);