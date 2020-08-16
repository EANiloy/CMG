import React from 'react';
import Pizza from '../Pizza/Pizza';
import Button from '../UI/Button/Button';
import classes from './PizzaCartSummary.css';
import Auxilliary from '../hoc/Auxiliary';
const pizzaCartSummary = (props) =>
{
    return (
        <Auxilliary>
        <div className={classes.CartSummary}>
            <h1>Hope you are happy with your order</h1>
            <div className={classes.Pizzabuild}>
                <Pizza ingredients={props.ingredients}/>
            </div>
            </div>
            <div className={classes.Buttons}>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked = {props.checkoutContinued}>Continue</Button>
            </div>
            </Auxilliary>
    );


}

export default pizzaCartSummary;