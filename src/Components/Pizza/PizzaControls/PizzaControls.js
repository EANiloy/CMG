import React, { Component } from 'react';
import classes from './PizzaControls.css';
import PizzaControl from './PizzaControl/PizzaControl';
import Auxilliary from '../../hoc/Auxiliary';
class PizzaControls extends Component {
    state = {
        btndisabled1 : false,
        btndisabled2 : false,
        btndisabled3 : false,
        chickenBtn : false,
        beefBtn:false
    }
    controls =[
        {label:'Sauce', type:'sauce'},
        {label:'Pepperoni', type:'pepperoni'},
        {label:'Mushrooms', type:'mushrooms'},
        {label:'Cheese', type:'cheese'},
        {label:'Bacon',type:'bacon'}
    ]
    setDisabled = (event) =>
    {
        if(event === '1')
        {
            this.setState({btndisabled1:true,btndisabled2:false,btndisabled3:false})
        }
        else if(event === '2')
        {
            this.setState({btndisabled1:false,btndisabled2:true,btndisabled3:false})
        }
        else if(event === '3')
        {
            this.setState({btndisabled1:false,btndisabled2:false,btndisabled3:true})
        }
    }
    setDisabledbase = (event) =>
    {
        if(event ==='1')
        {
            this.setState({chickenBtn:true,beefBtn:false})
        }
        else if(event ==='2')
        {
            this.setState({chickenBtn:false,beefBtn:true})
        }
    }
    render()
    {
        return(
        <Auxilliary>
    <div className = {classes.PizzaControls}>
        <p className={classes.Price}>Current Price: <strong>{this.props.price}</strong> Taka</p>
        {this.controls.map(ctrl =>(
            <PizzaControl key={ctrl.label} label={ctrl.label}
            added = {()=>this.props.ingredientAdded(ctrl.type)}
            removed ={()=>this.props.ingredientRemoved(ctrl.type)}
            disabled={this.props.disabled[ctrl.type]}
            />
        ))}
        <div className={classes.SizeControl}>
        <button className ={classes.Size} onClick ={()=>{this.props.setSize('1'); this.setDisabled('1');}}  
        disabled = {this.state.btndisabled1}>6 Inches</button>
        <button className ={classes.Size} onClick ={()=>{this.props.setSize('2'); this.setDisabled('2');}}
        disabled = {this.state.btndisabled2}>8 Inches</button>
        <button className ={classes.Size} onClick ={()=>{this.props.setSize('3'); this.setDisabled('3');}}
        disabled = {this.state.btndisabled3}>12 Inches</button>
        </div>
        <div className = {classes.BaseControl}>
        <button className ={classes.Base} onClick ={()=>{this.props.setBase('Chicken');this.setDisabledbase('1');}} 
        disabled = {this.state.chickenBtn}>Chicken</button>
        <button className ={classes.Base} onClick ={()=>{this.props.setBase('Beef');this.setDisabledbase('2');}}  
        disabled = {this.state.beefBtn}>Beef</button>
        </div>
        <button className={classes.OrderButton}
        disabled={!this.props.purchaseable}
        onClick ={this.props.ordered}>Order Now</button>
    </div>
    </Auxilliary>
    );
    
}
}
export default PizzaControls;