import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from './Components/Layout/Layout';
import PizzaBuilder from './Containers/PizzaBuilder/PizzaBuilder';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import BurgerCart from './Containers/Cart/BurgerCart';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import PizzaCart from './Containers/Cart/PizzaCart.js';
import Home from './Containers/Home/Home';
import Builder from './Containers/Builders/Builder';
import MyOrders from './Containers/MyOrders/MyOrders';
import ContactData from './Containers/Contact/ContactData';
import Signin from './Containers/Signin/Signin';
import AdminPanel from './Containers/AdminPanel/AdminPanel';
import AdminOrders from './Containers/AdminPanel/Orders/Orders';
import AdminSales from './Containers/AdminPanel/Sales/Sales';
import EmployeePanel from './Containers/EmployeePanel/EmployeePanel';
import SignUp from './Containers/SignUp/SignUp';
import Employees from './Containers/Employees/Employees';
import AdminMenus from './Containers/AdminPanel/Menus/Menus';
import Edit from './Containers/AdminPanel/Menus/Edit/Edit';
import Create from './Containers/AdminPanel/Menus/Create/Create';
import CreateSpecial from './Containers/AdminPanel/Menus/Create/CreateSpecial';
import EditSpecial from './Containers/AdminPanel/Menus/Edit/EditSpecial';
import Logout from './Containers/Logout/Logout';
import * as actions from './Store/actions/index';
class App extends Component {

  componentDidMount(){
    this.props.onTryautoSignin();
  }
  render() {
    let routes = null;
    if (!this.props.isAuthenticated && !this.props.isAdmin)
    {
      routes=(
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/index" exact component={Home} />
        <Route path="/burgerbuilder" component={BurgerBuilder} />
        <Route path="/pizzabuilder" component={PizzaBuilder} />
        <Route path="/burgercart" component={BurgerCart} />
        <Route path="/pizzacart" component={PizzaCart} />
        <Route path="/my-orders" component={MyOrders} />
        <Route path="/builders" component={Builder} />
        <Route path="/submit-order" component={ContactData} />
        <Route path="/signin" component={Signin} />
        <Redirect to="/" />
      </Switch>
    )}
    else if(this.props.isAuthenticated && !this.props.isAdmin)
      {
        routes=(
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/index" exact component={Home} />
            <Route path="/burgerbuilder" component={BurgerBuilder} />
            <Route path="/pizzabuilder" component={PizzaBuilder} />
            <Route path="/burgercart" component={BurgerCart} />
            <Route path="/pizzacart" component={PizzaCart} />
            <Route path="/my-orders" component={MyOrders} />
            <Route path="/builders" component={Builder} />
            <Route path="/employee-panel" component={EmployeePanel} />
            <Route path="/submit-order" component={ContactData} />
            <Route path="/signin" component={Signin} />
            <Route path="/signedout" component={Logout} />
          </Switch>
        )}
      else if(this.props.isAuthenticated && this.props.isAdmin)
        {
          routes =(
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/index" exact component={Home} />
              <Route path="/burgerbuilder" component={BurgerBuilder} />
              <Route path="/pizzabuilder" component={PizzaBuilder} />
              <Route path="/burgercart" component={BurgerCart} />
              <Route path="/pizzacart" component={PizzaCart} />
              <Route path="/my-orders" component={MyOrders} />
              <Route path="/builders" component={Builder} />
              <Route path="/submit-order" component={ContactData} />
              <Route path="/signin" component={Signin} />
              <Route path="/admin-panel" component={AdminPanel} />
              <Route path="/checkorders" component={AdminOrders} />
              <Route path="/checksales" component={AdminSales} />
              <Route path="/signup" component={SignUp} />
              <Route path="/employee-list" component={Employees} />
              <Route path="/admin-menus" component={AdminMenus} />
              <Route path="/edit-menu" component={Edit} />
              <Route path="/edit-special-menu" component={EditSpecial} />
              <Route path="/create-menu" component={Create} />
              <Route path="/create-special-menu" component={CreateSpecial} />
              <Route path="/signedout" component={Logout} />
            </Switch>
          )
        }
    return (
      <div>
        <Layout id="Layout">
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStatetoProps = state =>
{
  return{
    isAuthenticated : state.auth.token !== null,
    isAdmin: state.auth.userId === "kbvaXgzxkvMtg5K1cWFvDre9pi13",
  }
}
const mapDispatchtoProps =dispatch=>
{
  return{
    onTryautoSignin:()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(App));
