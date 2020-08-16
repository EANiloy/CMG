import React, { Component } from 'react';
import Auxiliary from '../../Components/hoc/Auxiliary'
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../Components/hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../Store/actions/index';
import Spinner2 from '../../Components/UI/Spinner/Spinner2';
import * as orderActions from '../../Store/actions/order';
import {withRouter} from 'react-router';
class BurgerBuilder extends Component{

    state = {
        purchaseable:false,
        purchasing: false,
        loading:false,
        ordered:false
    }
    setOrdered = () => {
        this.setState({ ordered: true })
        setTimeout(this.closemessage, 500)
    }
    closemessage = () => {
        this.setState({ ordered: false })
    }
    gotoBuilders = () => {
        this.props.history.push("/builders")
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }
    purchaseHandler =() =>
    {
        if (this.props.spice === null) {
            alert("Please Choose a Spice Level")
        }
        else {
            this.setState({ purchasing: true });
        }
    }
    purchaseCancelHandler = () =>
    {
        this.setState({purchasing:false})
    }
    
    purchaseContinueHandler =() =>
    {
        this.setState({purchasing:false})
        const burgerorder = {
            ingredients: this.props.bings,
            price: this.props.bprice,
            spicelevel:this.props.spice,
            type: 'Burger',
            status: 'Pending'
        }
        this.props.onOrdered(burgerorder,this.props.bprice);
        this.setOrdered();
        setTimeout(this.gotoBuilders,1000)
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey =>
            {
                return ingredients[igKey]
            }).reduce((sum,el)=>
            {
                return sum+el;
            },0);
            return sum>0;
    }
    render()
    {
        const disabledInfo = {
            ...this.props.bings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]= (disabledInfo[key]<=0)
        }
        let orderSummary = null;
        if(this.state.loading)
        {
            orderSummary = <Spinner/>
        }
        let burger = this.props.error ? <p>Ingredients Cannot be loaded</p> : <Spinner2 />;

        if(this.props.bings)
        {
            burger =(
                <Auxiliary>
                    <Burger ingredients={this.props.bings} />
                    <BuildControls
                        ingredientAdded={this.props.onburgerIngredientAdded}
                        ingredientRemoved={this.props.onburgerIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.bprice}
                        purchaseable={this.updatePurchaseState(this.props.bings)}
                        ordered={this.purchaseHandler} 
                        setSpice = {this.props.onSpiceSelected}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.bings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.bprice}
                spice= {this.props.spice}
            />
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    {orderSummary} 
                </Modal>
                <Modal show={this.state.ordered} modalClosed={this.closemessage}>
                    <p>Item Added to cart</p>
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state =>
{
    return {
        bings:state.brg.bingredients,
        bprice:state.brg.btotalPrice,
        error:state.brg.error,
        order: state.cart.orders,
        spice:state.brg.spice
    };

}

const mapDispatchToProps = dispatch =>
{
    return{
        onburgerIngredientAdded: (ingName) => dispatch (burgerBuilderActions.addBIngredient(ingName)),
        onburgerIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeBIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initBIngredients()),
        onSpiceSelected: (spice) => dispatch(burgerBuilderActions.setSpice(spice)),
        onOrdered : (order,price) => dispatch({type: orderActions.ADD_CART,order:order,price:price})
    };
}

export default  connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));