import React, {Component} from 'react';
import classes from './AdminPanel.css';
import Auxiliary from '../../Components/hoc/Auxiliary';
import {withRouter} from 'react-router';
class AdminPanel extends Component
{
    state={
        panelNo: 0,
        value:"",
        display:"none",
        height:"25%"
    }
    rightPanel = null;
    selectOrders =() =>
    {
        this.setState({ panelNo: 1 });
    }
    selectEmployees=()=>
    {
        this.setState({ panelNo: 2 });
    }
    selectSales =()=>
    {
        this.setState({ panelNo: 3 });
    }
    selectMenus = () =>
    {
        this.setState({ panelNo: 4 });
    }
    selectHome = (event) =>
    {
        event.preventDefault();
        this.setState({panelNo:0});
    }
    findOrder=()=>
    {
        const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("specific")+"&"+encodeURIComponent("id")+"="+encodeURIComponent(this.state.value))
                    this.props.history.push({
                        pathname:"/checkorders",
                        search: '?' + query
                    })
    }

    gotoOrders =(type)=>
    {   
        switch(type) {
            case 1 :
                {
                    this.setState({display:"inline",height:"20%"})
                    break;
                }
            case 2:
                {
                    const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("today"))
                    this.props.history.push({
                        pathname: "/checkorders",
                        search: '?' + query
                    })
                    break;
                }
            case 3:
                {
                    const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("monthly"))
                    this.props.history.push({
                        pathname: "/checkorders",
                        search: '?' + query
                    })
                    break;
                }   
            case 4:
                {
                    const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("all"))
                    this.props.history.push({
                        pathname: "/checkorders",
                        search: '?' + query
                    })
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    gotoSales = (type) => {
        switch (type) {
            case 1:
                {
                    const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("all"))
                    this.props.history.push({
                        pathname: "/checksales",
                        search: '?' + query
                    })
                    break;
                }
            case 2:
                {
                    const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("today"))
                    this.props.history.push({
                        pathname: "/checksales",
                        search: '?' + query
                    })
                    break;
                }
            case 3:
                {
                    const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("monthly"))
                    this.props.history.push({
                        pathname: "/checksales",
                        search: '?' + query
                    })
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    createNew =()=>
    {
        this.props.history.push("/signup")
    }
    gotoEmployees=()=>
    {
        this.props.history.push("/employee-list")
    }
    changed=(event)=>
    {
        this.setState({value:event.target.value})
    }
    gotoAllMenus =()=>
    {
        this.props.history.push("/admin-menus")
    }
    createMenu=()=>
    {
        this.props.history.push("/create-menu")
    }
    createSpecialMenu=()=>
    {
        this.props.history.push("/create-special-menu")
    }

    render()
    {
       switch(this.state.panelNo)
        {
            case 1: 
            {
                   this.rightPanel = (<div className={classes.RightPanel}>
                    <button style={{height:this.state.height}}className={classes.RightItems} onClick={(type)=>this.gotoOrders(1)}>Specific Order</button>
                    <div style={{ display: this.state.display}} className={classes.IDiv}>
                    <input className={classes.Input} type="text" value={this.state.value} onChange={this.changed} />
                    <button className={classes.Go} onClick={this.findOrder}>Go</button>
                    </div>
                    <button style={{ height: this.state.height }} className={classes.RightItems} onClick={(type)=>this.gotoOrders(2)}>Todays Orders</button>
                    <button style={{ height: this.state.height }} className={classes.RightItems} onClick={(type)=>this.gotoOrders(3)}>Monthly Orders</button>
                    <button style={{ height: this.state.height }} className={classes.RightItems} onClick={(type)=>this.gotoOrders(4)}>All Orders</button>
                    </div>);
                    break;
            }
            case 2 :
                {
                    this.rightPanel = (
                        <div className={classes.RightPanel}>
                            <button className={classes.RightItems} onClick={this.gotoEmployees}>All Employees</button>
                            <button className={classes.RightItems} onClick={this.createNew}>Create New Employee Account</button>
                        </div>
                    );
                    break;
                }
                case 3 :
                    {
                     this.rightPanel =(
                            <div className={classes.RightPanel}>
                            <button className={classes.RightItems} onClick={()=>this.gotoSales(1)}>All Bills</button>
                            <button className={classes.RightItems} onClick={() => this.gotoSales(2)}>Todays Bills</button>
                            <button className={classes.RightItems} onClick={() => this.gotoSales(3)}>Monthly Bills</button>
                            </div>
                        ) ;
                        break;
                    }
                case 4 :
                    {
                        this.rightPanel = (
                            <div className={classes.RightPanel}>
                                <button className={classes.RightItems} onClick={this.gotoAllMenus}>All Menus</button>
                                <button className={classes.RightItems} onClick={this.createMenu}>Create Menu</button>
                                <button className={classes.RightItems} onClick={this.createSpecialMenu}>Create Special Menu</button>
                            </div>
                        );
                        break;
                    }
                default:
                    this.rightPanel = (
                   <div className={classes.RightPanel}> 
                    <p className={classes.Default}>Please Choose an option from the left side</p>
                        </div>
                        );
                    break;
        }
        return(
            <Auxiliary >
            <h3 className ={classes.Header} >Admin Panel</h3>
            <div className={classes.Panel} onDoubleClick={(event)=>this.selectHome(event)}>
                <div className={classes.LeftPanel}>
                    <button className={classes.Items} onClick={this.selectOrders}>Orders</button>
                    <button className={classes.Items} onClick={this.selectEmployees}>Employees</button>
                    <button className={classes.Items} onClick={this.selectSales}>Sales</button>
                    <button className={classes.Items} onClick={this.selectMenus}>Menus</button>
                </div>
                {this.rightPanel}
            </div>
            </Auxiliary>
        );
    }
}

export default withRouter(AdminPanel);