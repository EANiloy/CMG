import React, { Component } from 'react';
import Auxiliary from '../../../Components/hoc/Auxiliary';
import withErrorHandler from '../../../Components/hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../Components/UI/Spinner/Spinner3';
import classes from './Sales.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import AdminSales from '../../../Components/AdminSales/AdminSales';
import ReactDomServer from 'react-dom/server';
class Sales extends Component {
    state = {
        querytype: '',
        dataloaded: false,
        data: [],
        orders: [],
        searchId: null
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let type = null;
        let id = null;
        for (let param of query.entries()) {
            if (param[1] === "specific") {
                type = param[1]
                break;
            }
            else {
                type = param[1]
                break;
            }
        }
        if (type === "specific") {
            for (let param of query.entries()) {
                id = param[1]
            }
        }
        this.setState({ querytype: type, searchId: id })
        if (!this.state.dataloaded) {
            this.loadData();
        }
    }
    loadData = () => {
        axios.get("https://custom-menu-generator.firebaseio.com/Orders.json").then(res => {
            let data = []
            data.push(res.data)
            this.setState({ data: data, dataloaded: true })
            this.loadOrders();
        }).catch(err => {
            console.log(err)
            this.setState({ dataloaded: false })
        })
    }
    cancelOrder = (TableNo, CusName, folderid, index) => {
        index.map(el => {
            axios.patch("https://custom-menu-generator.firebaseio.com/Orders/" + TableNo + "/" + CusName + "/" + folderid + "/orderinfo/" + el + "/order/.json",
                {
                    status: "Canceled"
                }).then(res => { return null }
                ).catch(err => {
                    console.log(err)
                })
            return null;
        })
        this.props.history.push("/admin-panel")

    }
    loadOrders = () => {
        let orderData = [];
        let temporders = [];
        let data = [];
        let tables = [];
        let cust = [];
        Object.entries(this.state.data).map(el => {
            tables = el[1];
            return null
        })
        for (let tb in tables) {
            Object.entries(tables[tb]).map(cus => {
                cust.push(cus[1])
                return null;
            })
        }
        for (let cs in cust) {
            Object.entries(cust[cs]).map(or => {
                orderData.push(or)
                return null;
            })
        }
        orderData.map(ord => {
            data.push(ord)
            return null;
        })
        temporders = data.map(ord => {
            let id = ord[0]
            return (<AdminSales Canceled={this.cancelOrder} gotoOrderdetails={this.gotoOrderDetails} data={ord[1]} key={id} folder={ord[0]} type={this.state.querytype} search={this.state.searchId} />)
        })
        this.setState({ orders: temporders })

    }
    goHome = () => {
        this.props.history.push("/admin-panel");
    }
    gotoOrderDetails=(url)=>
    {
        this.props.history.push(url)
    }
    render() {
        return (
            <Auxiliary>
                <h3 className={classes.Header} >Admin Panel</h3>
                <button className={classes.Link} onClick={this.goHome}>Go Back</button>
                {this.state.dataloaded ?
                    ReactDomServer.renderToStaticMarkup(this.state.orders) !== '' ?
                        <div className={classes.Orders}>{this.state.orders}</div> :
                        <div className={classes.Message}>
                            <h3>Sorry!!!</h3>
                            <p>Bills not found</p>
                        </div>
                    :
                    <div className={classes.Spinner}>
                        <Spinner />
                    </div>}
            </Auxiliary>
        );
    }
}
export default withRouter(withErrorHandler(Sales, axios));
