import React, {Component} from 'react';
import EmployeeOrder from '../../Components/EmployeeOrder/EmployeeOrder';
import axios from '../../axios-orders'
import WithErrorHandler from '../../Components/hoc/withErrorHandler/withErrorHandler';
import classes from './EmployeePanel.css';
import ReactDomServer from 'react-dom/server';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Auxiliary from '../../Components/hoc/Auxiliary';
class EmployeePanel extends Component {
    state = {
        loading: true,
        data: null,
        dataloaded: false,
        OrderItems: null,
        datashowed:false,
    }
    componentDidMount() {
        axios.get('/Orders.json')
            .then(res => {
                let data = [];
                data.push(res.data)
                this.setState({ data: data, dataloaded: true })
            }
            )
            .catch(err => {
                this.setState({ loading: false })
            })
    }
    PickedUp = (folderid, TableNo, CusName, indexes) => {
        indexes.map(el => {
            axios.patch("https://custom-menu-generator.firebaseio.com/Orders/" + TableNo + "/" + CusName + "/" + folderid + "/orderinfo/" + el + "/order/.json",
                {
                    status: "Preparing"
                }).then(response => {
                    axios.get('/Orders.json')
                        .then(res => {
                            let data = [];
                            data.push(res.data)
                            this.setState({ data: data, dataloaded: true })
                        }
                        )
                        .catch(err => {
                            this.setState({ loading: false })
                        })

                }).catch(err => {
                    console.log(err)
                })
            return null;
        }
        )
    }
    Served = (folderid, TableNo, CusName, indexes) => {

        indexes.map(el => {
            axios.patch("https://custom-menu-generator.firebaseio.com/Orders/" + TableNo + "/" + CusName + "/" + folderid + "/orderinfo/" + el + "/order/.json",
                {
                    status: "Served"
                }).then(response => {
                    axios.get('/Orders.json')
                        .then(res => {
                            let data = [];
                            data.push(res.data)
                            this.setState({ data: data, dataloaded: true })
                        }
                        )
                        .catch(err => {
                            this.setState({ loading: false })
                        })

                }).catch(err => {
                    console.log(err)
                })
            return null;
        }
        )
    }

    render() {
        let orderData = [];
        let temporders = [];
        let data = [];
        let tables = [];
        let cust = [];
        let inc =0;
        console.log("This is printed "+inc+"times")
        inc = inc+1;
        if (this.state.dataloaded) {
                Object.entries(this.state.data).map(el => {
                    tables = el[1]
                    return null;
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
                return(<EmployeeOrder data={ord} key={id} PickedUp={this.PickedUp} Served={this.Served}/>);
            });
        }
        return (
            !this.state.dataloaded ?
                <Auxiliary>
                    <h2 className={classes.Header}>Employee Panel</h2>
                    <div className={classes.Spinner}><Spinner />
                    </div>
                </Auxiliary>
                :
                ReactDomServer.renderToStaticMarkup(temporders) === '' ?
                    <Auxiliary>
                        <h2 className={classes.Header}>Employee Panel</h2>
                        <div>
                            <div className={classes.Order}>
                                <p className={classes.Message}>No pending orders right now.</p>
                            </div>
                        </div>
                    </Auxiliary >
                    :
                    <Auxiliary>
                        <h2 className={classes.Header}>Employee Panel</h2>
                        <div>
                            {temporders}
                        </div>
                    </Auxiliary >
        )
    }
}
export default WithErrorHandler(EmployeePanel, axios);