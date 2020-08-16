import React, { Component } from 'react';
import MyOrder from '../../Components/MyOrder/MyOrder';
import {connect} from 'react-redux';
import classes from './MyOrders.css';
import * as orderActions from '../../Store/actions/order';
import Modal from '../../Components/UI/Modal/Modal';
import Button from '../../Components/UI/Button/Button';
import Auxiliary from '../../Components/hoc/Auxiliary';
import { withRouter } from 'react-router';
import image from '../../Assets/Images/Cart/1.png';

class MyOrders extends Component
{
    state ={
        removing:false,
        removedid : null,
        price:0,
        purchasing:false,
    }
    removeItem = (id,price) =>
    {
        this.setState({removing:true, removedid:id,price:price})
    }
    removeContinued = () =>
    {
        this.props.onRemovePressed(this.state.removedid,this.state.price)
        this.setState({removing:false,removedid:null,price:0})
    }
    removeCanceled = () =>
    {
        this.setState({removing:false})
    }
    gotoContact =() =>
    {
        this.props.history.push('/submit-order')
    }
    purchaseCanceled = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinued =() =>
    {
        this.setState({ purchasing: true })   
    }
    render()
    {
        let Orders = [];
        
        for(let each in this.props.order)
        {
            Orders.push({...this.props.order[each]})
        }
        let menus = null;
         menus = Orders.map(item =>
            {
                return(
                <MyOrder data = {item} key ={item.id} Delete={this.removeItem}/>)       
            })
        return(
                this.props.order.length===0 ? <div className ={classes.Message}> 
                    <p>Your cart is empty</p>
                    <p>Please start adding items to your cart</p>
                    <img src={image} alt ="Cart"className={classes.Image} />
                </div> :
                <Auxiliary>
                <div className={classes.Orders}>
                <Modal show={this.state.removing} modalClosed={this.removeCanceled}>
                    <div>
                        <p>Do you want to remove this Item</p>
                        <Button btnType="Success" clicked={this.removeCanceled}>Cancel</Button>
                        <Button btnType="Danger" clicked={this.removeContinued}>Continue</Button>
                    </div>
                </Modal>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseContinued}>
                    <p>Do you want to continue the purchase?</p>
                    <Button btnType="Danger" clicked={this.purchaseCanceled}>Go Back</Button>
                    <Button btnType="Success" clicked={this.gotoContact}>Continue</Button>
                </Modal>
                {menus}
                </div>
                <p className={classes.PriceMessage}>Total Price is: {this.props.totalPrice} </p>
                <div className={classes.BuyButton}>
                <button className={classes.Buy} onClick={this.purchaseContinued}>Submit Order</button>
                </div>
                </Auxiliary>

        )
    }
}

const mapStateToProps = state =>
{
    return{
        order :state.cart.orders,
        totalPrice: state.cart.totalPrice,
    };
}
const mapDispatchToProps = dispatch =>
{
    return{
        onRemovePressed : (id,price) => dispatch({type:orderActions.REMOVE_CART, remElId:id,price:price}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withRouter(MyOrders));