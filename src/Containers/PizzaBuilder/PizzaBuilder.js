import React,{Component} from 'react';
import Auxiliary from '../../Components/hoc/Auxiliary'
import Pizza from '../../Components/Pizza/Pizza';
import PizzaControls from '../../Components/Pizza/PizzaControls/PizzaControls';
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Pizza/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../Components/hoc/withErrorHandler/withErrorHandler';
import{connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Spinner2 from '../../Components/UI/Spinner/Spinner2';
import * as pizzaBuilderActions from '../../Store/actions/index';
import * as orderActions from '../../Store/actions/order';
import {withRouter} from 'react-router';
class PizzaBuilder extends Component{

    state = {
        purchaseable:false,
        purchasing:false,
        loading:false,
        ordered:false
    }
    setOrdered =() =>
    {
        this.setState({ordered:true})
        setTimeout(this.closemessage,500)
    }
    closemessage =() =>
    {
        this.setState({ordered:false})
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }   
    purchaseHandler =() =>
    {
        if(this.props.size===0)
        {
            alert("Please choose a pizza size");
        }
        else if(this.props.base === null)
        {
            alert("Please choose a base ingredient")
        }
        else {
        this.setState({purchasing:true});
        }
    }
    purchaseCancelHandler = () =>
    {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler =() =>
    {
        this.setState({purchasing:false})
        const pizzaorder = {
            ingredients: this.props.pings,
            price: this.props.pprice,
            size: this.props.size,
            base: this.props.base,
            type: 'Pizza',
            status: 'Pending'
        }
        this.props.onOrdered(pizzaorder,this.props.pprice);
        this.setOrdered();
        setTimeout(this.gotoBuilders,1000);
    }
    gotoBuilders =() =>
    {
        this.props.history.push("/builders")
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }
    render()
    {
        const disabledInfo = {
            ...this.props.pings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]= (disabledInfo[key]<=0)
        }let orderSummary = null;
        if(this.state.loading)
        {
            orderSummary = <Spinner/>
        }

        let pizza = this.props.error ? <p>Ingredients Cannot be loaded</p> : <Spinner2 />;
        if(this.props.pings)
        {
            orderSummary = <OrderSummary
                ingredients={this.props.pings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.pprice}
                size={this.props.size}
                Base={this.props.base}
            />
            pizza =(<Auxiliary>
                    <Pizza ingredients={this.props.pings} />
                    <PizzaControls
                        ingredientAdded={this.props.onpizzaIngredientAdded}
                        ingredientRemoved={this.props.onpizzaIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.pprice}
                        purchaseable={this.updatePurchaseState(this.props.pings)}
                        ordered={this.purchaseHandler}
                        setSize={this.props.onSizeSelected}
                        setBase={this.props.onBaseSelected}
                    />
                </Auxiliary>);
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Modal show={this.state.ordered} modalClosed = {this.closemessage}>
                    <p>Item Added to cart</p>
                </Modal>
                {pizza}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        pings: state.pizz.pingredients,
        pprice: state.pizz.ptotalPrice,
        size: state.pizz.size,
        base: state.pizz.base,
        error : state.pizz.error,
        order : state.cart.orders
    };

}

const mapDispatchToProps = dispatch => {
    return {
        onpizzaIngredientAdded: (ingName) => dispatch(pizzaBuilderActions.addPIngredient(ingName)),
        onpizzaIngredientRemoved: (ingName) => dispatch(pizzaBuilderActions.removePIngredient(ingName)),
        onSizeSelected: (size) => dispatch(pizzaBuilderActions.setSize(size)),
        onBaseSelected: (base) => dispatch(pizzaBuilderActions.setBase(base)),
        onInitIngredients: () => dispatch(pizzaBuilderActions.initPIngredients()),
        onOrdered: (order,price) => dispatch({ type: orderActions.ADD_CART, order: order, price:price })
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(PizzaBuilder, axios)));