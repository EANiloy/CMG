import React, { Component } from 'react';
import classes from './Menu.css';
import Items from './Items/Items';
import Axios from 'axios';
import Spinner from '../UI/Spinner/Spinner2';
import Auxiliary from '../hoc/Auxiliary';
import WithErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {withRouter} from 'react-router';
import Modal from '../../Components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as orderActions from '../../Store/actions/order';
class Menu extends Component
{
    state ={
        menu:[],
        dataloaded:false,
        showmodal:false,
        specialmenu:[],
        specialdataloaded:false,
        specialnull:true
    }
    showmodal=(order)=>
    {
        this.props.onOrdered(order,order.price)
        this.setState({showmodal:true})
        setTimeout(this.closemodal,800)
    }
    closemodal = () =>
    {
        this.setState({showmodal:false})
    }
    componentDidMount(){
        Axios.get('https://custom-menu-generator.firebaseio.com/Menus.json').then(
            response =>{
                this.setState({menu:response.data,dataloaded:true})
            }
        ).catch(
            error =>
            {
                this.setState({dataloaded:false})
                console.log(error)
            }
        )
        Axios.get('https://custom-menu-generator.firebaseio.com/SpecialMenus.json').then(
            response => {
                if(response.data===null)
                {
                    this.setState({specialdataloaded:false,specialnull:true})
                }
                else{
                this.setState({ specialmenu: response.data, specialdataloaded: true,specialnull:false })}
            }
        ).catch(
            error => {
                this.setState({ specialdataloaded: false })
                console.log(error)
            }
        )
    }
    gotoBuilder = () =>
    {
        return(
        this.props.history.push('/builders'))
    }
    render(){
        let menu = <Spinner/>
        let specialmenu = null
        if(this.state.dataloaded)
        {
            let menuElements = []
            for (let key in this.state.menu)
            {
                menuElements.push({...this.state.menu[key]})
            }
            menu = menuElements.map(item=>
                {
                    return(<Items data = {item} key={item.id} Ordered={this.showmodal}/>)
                })
        }
        if(this.state.specialdataloaded)
        {
            let specialmenuElements = []
            for (let key in this.state.specialmenu) {
                specialmenuElements.push({ ...this.state.specialmenu[key] })
            }
            specialmenu = specialmenuElements.map(item => {
                return (<Items data={item} key={item.id} Ordered={this.showmodal} />)
            })
        }
    return(
        <Auxiliary>
        {this.state.dataloaded ? <h1 className={classes.Heading}>Today's Menus are: </h1> : null}
        <div className={classes.Menu}>
        <Modal show={this.state.showmodal} modalClosed={this.closeModal}>
        <p>Item added to cart</p>
        </Modal>
        {menu}
        </div>
        {this.state.specialdataloaded ?
        <Auxiliary>
                    <h1 className={classes.Heading}>Today's special menus are: </h1>
            <div className={classes.SpecialMenu}>
                <Modal show={this.state.showmodal} modalClosed={this.closeModal}>
                    <p>Item added to cart</p>
                </Modal>
                {specialmenu}
            </div>
            </Auxiliary>:null}
        {this.state.dataloaded?
        <div className={classes.Custom}>
        <button className={classes.Builder} onClick={this.gotoBuilder}><em>Custom Item Builders</em></button>
        </div>:null}
        </Auxiliary>
    )
    }
}
const mapStateToProps = state => {
    return {
        order: state.cart.orders
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrdered: (order,price) => dispatch({ type: orderActions.ADD_CART, order: order,price:price })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WithErrorHandler(Menu,Axios)));