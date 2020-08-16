import React , {Component} from 'react';
import classes from './PizzaIngredients.css';
import PropTypes from 'prop-types';

class PizzaIngredients extends Component {
    render()
    {
    let ingredient = null;
    switch(this.props.type)
    {
            case ("base"):
            {
                ingredient = <div className={classes.Base}></div>
                break;
            }
            case('sauce'):
            {
                ingredient = <div className = {classes.Sauce}></div>
                break;
            }
            case('cheese'):
            {
                ingredient = <div className = {classes.Cheese}></div>
                break;
            }
            
            case ('mushrooms'):
            {
                ingredient = <div className = {classes.Mushrooms}></div>
            break;
            }
            case ('pepperoni'):
            {
                ingredient = <div className = {classes.Pepperoni}></div>
            break;
            }
            case ('bacon'):
            {
                ingredient = <div className = {classes.Bacon1}>
                <div className = {classes.Bacon2}></div></div>
            break;
            }
            default:
                {
                    ingredient=null;
                }
    }
    return ingredient;
    };

}
PizzaIngredients.propTypes ={
    type:PropTypes.string.isRequired
};
export default PizzaIngredients;