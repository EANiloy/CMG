import React, { Component } from 'react';
import BurgerCartSummary from '../../Components/CartSummary/BurgerCartSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Contact/ContactData';
import {connect} from 'react-redux'

class BurgerCart extends Component {

    checkoutCancelledHandler = () =>
    {
                this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>
    {
        this.props.history.replace('/Burgercart/contact-data');
    }
    render()
    {
        return(
            <div>
                <BurgerCartSummary ingredients ={this.props.bings}
                        checkoutCancelled = {this.checkoutCancelledHandler}
                        checkoutContinued = {this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-Data'} render = {(props)=>(<ContactData 
                type='burger'
                {...props}
                />)}/>
            </div>
        )
    }
}

const mapStateToProps = state =>
{
    return{
        bings:state.brg.bingredients,
        bprice: state.brg.btotalPrice
    }
}

export default connect(mapStateToProps)(BurgerCart);