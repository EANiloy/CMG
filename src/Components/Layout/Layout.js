import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
class Layout extends Component {
    state = {
        showSideDrawer :false
    }
    sideDrawerClosedHandler = () =>
    {
        return(
                this.setState({showSideDrawer:false})
        );
    }
    sideDrawerToggleHandler =() =>
    {
        return(
            this.setState((prevState) =>{
                return {showSideDrawer: !prevState.showSideDrawer}
            })
        );
    }
    goHome = (ev) =>
    {
        this.props.history.push("/home")
        this.sideDrawerClosedHandler();
    }
    goToSignin = () => {

             this.props.history.push("/signin");
    }
    logout=()=>
    {
        this.props.history.push("/signedout");
    }
    render(){
        return(
    <Auxiliary>
    <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} goHome={this.goHome} signin={this.goToSignin}/>
    <SideDrawer 
    open ={this.state.showSideDrawer} 
    closed ={this.sideDrawerClosedHandler}
    goHome={this.goHome}
    signin={this.goToSignin}
    logout={this.logout}
    isAuth={this.props.isAuthenticated}/>
    <main className={Classes.Content}>
        {this.props.children}
    </main>
    </Auxiliary>
        );
    }
}
const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStatetoProps)(withRouter(Layout));