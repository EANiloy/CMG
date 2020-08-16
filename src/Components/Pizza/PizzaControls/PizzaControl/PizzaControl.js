import React from 'react';
import classes from './PizzaControl.css'

const pizzaControl = (props) =>
(
    <div className = {classes.BuildControl}>
        <div className ={classes.Label}>{props.label}</div>
        <button className = {classes.More} onClick ={props.added} disabled={!props.disabled}>Add</button>
        <button className = {classes.Less} onClick ={props.removed} disabled = {props.disabled}>Remove</button>
    </div>
)
export default pizzaControl;