import React, { Component } from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

class BuildControls extends Component{
    state={
        btndisabled1:false,
        btndisabled2:false,
        btndisabled3:false
    }
    controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Chicken', type: 'chicken' },
        { label: 'Beef', type: 'beef' },
        { label: 'Cheese', type: 'cheese' }
    ]
    setDisabled = (event) => {
        if (event === '1') {
            this.setState({ btndisabled1: true, btndisabled2: false, btndisabled3: false })
        }
        else if (event === '2') {
            this.setState({ btndisabled1: false, btndisabled2: true, btndisabled3: false })
        }
        else if (event === '3') {
            this.setState({ btndisabled1: false, btndisabled2: false, btndisabled3: true })
        }
    }
    render()
    {
        return(
    <div className = {classes.BuildControls}>
        <p className={classes.Price}>Current Price: <strong>{this.props.price}</strong> Taka</p>
        {this.controls.map(ctrl =>(
            <BuildControl key={ctrl.label} label={ctrl.label}
            added = {()=>this.props.ingredientAdded(ctrl.type)}
            removed ={()=>this.props.ingredientRemoved(ctrl.type)}
            disabled={this.props.disabled[ctrl.type]}/>
        ))}
        <div className={classes.SpiceControl}>
            <button className={classes.Spice} onClick={() => { this.props.setSpice('Mild'); this.setDisabled('1'); }}
                disabled={this.state.btndisabled1}>Mild</button>
            <button className={classes.Spice} onClick={() => { this.props.setSpice('Spicy'); this.setDisabled('2'); }}
                disabled={this.state.btndisabled2}>Spicy</button>
            <button className={classes.Spice} onClick={() => { this.props.setSpice('Very Spicy'); this.setDisabled('3'); }}
                disabled={this.state.btndisabled3}>Very Spicy</button>
        </div>
        <button className={classes.OrderButton}
        disabled={!this.props.purchaseable}
        onClick ={this.props.ordered}>Order Now</button>
    </div>
        )
    }
}
export default BuildControls;