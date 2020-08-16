import React, { Component } from 'react';
import PizzaCartSummary from '../../Components/CartSummary/PizzaCartSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Contact/ContactData';
import {connect} from 'react-redux'

class PizzaCart extends Component {
    checkoutCancelledHandler = () =>
    {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>
    {
        this.props.history.replace('/Pizzacart/contact-data');
    }
    render()
    {
        return(
            <div>
                <PizzaCartSummary ingredients ={this.props.pings}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-Data'} render = {(props)=>(<ContactData 
                type='pizza'
                {...props}
                />)}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pings: state.pizz.pingredients,
        pprice: state.pizz.ptotalPrice,
        size: state.pizz.size,
        base: state.pizz.base
    }
}

export default connect(mapStateToProps)(PizzaCart);