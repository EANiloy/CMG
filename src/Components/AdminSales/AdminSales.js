import React from 'react';
import classes from './AdminSales.css';
const adminSales = (props) => {
    let id = props.data.id
    let date = props.data.date
    let cus = props.data.information
    let orderinfo = props.data.orderinfo

    let Orders = []
    for (let each in orderinfo) {
        Orders.push(orderinfo[each].order)
    }
    let indexes = []
    for (let i = 0; i < Orders.length; i++) {
        if (Orders[i].status !== "Served") {
            indexes.push(i);
        }
    }
    let orderMonth = null
    let firstslash = date.indexOf("/")
    orderMonth = date.slice(firstslash + 1)
    let secondslash = orderMonth.indexOf("/")
    orderMonth = orderMonth.slice(0, secondslash)
    orderMonth = parseInt(orderMonth, 10);
    let day = new Date();
    let today = day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear()
    let month = day.getMonth();
    let totalprice = 0;
    Orders.map(el => {
        totalprice=totalprice+el.price
        return null;
    })

    switch (props.type) {
        case "all":
            {
                const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("specific") + "&" + encodeURIComponent("id") + "=" + encodeURIComponent(id))
                const url = "/checkorders?" + query;
                return (
                    <div className={classes.Sales}>
                        <h4 className={classes.ID}>Order ID: {id}</h4>
                        <h5>Date: {date}</h5>
                        <div className={classes.Row}>
                            <p className={classes.Column}>Customer Name: {cus.Name}</p>
                            <p className={classes.Column}>Table No. <strong>{cus.TableNo}</strong></p>
                            <p className={classes.ColumnRight}>Contact No. {cus.PhnNo}</p>
                        </div>
                        <p className={classes.Price}>Total Price is: <strong>{totalprice}</strong></p>
                        <button className={classes.Check} onClick={() => props.gotoOrderdetails(url)}>Check Order Details</button>
                    </div>)
            }
        case "today":
            {
                const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("specific") + "&" + encodeURIComponent("id") + "=" + encodeURIComponent(id))
                const url = "/checkorders?" + query;
                if (date === today) {
                    return (
                        <div className={classes.Sales}>
                            <h4 className={classes.ID}>Order ID: {id}</h4>
                            <h5>Date: {date}</h5>
                            <div className={classes.Row}>
                                <p className={classes.Column}>Customer Name: {cus.Name}</p>
                                <p className={classes.Column}>Table No. <strong>{cus.TableNo}</strong></p>
                                <p className={classes.ColumnRight}>Contact No. {cus.PhnNo}</p>
                            </div>
                            <p className={classes.Price}>Total Price is: <strong>{totalprice}</strong></p>
                            <button className={classes.Check} onClick={()=>props.gotoOrderdetails(url)}>Check Order Details</button>
                        </div>)
                }
                else
                    return (null)
            }
        case "monthly":
            {
                const query = (encodeURIComponent("order type") + "=" + encodeURIComponent("specific") + "&" + encodeURIComponent("id") + "=" + encodeURIComponent(id))
                const url = "/checkorders?" + query;
                if (orderMonth === month) {
                    return (
                        <div className={classes.Sales}>
                            <h4 className={classes.ID}>Order ID: {id}</h4>
                            <h5>Date: {date}</h5>
                            <div className={classes.Row}>
                                <p className={classes.Column}>Customer Name: {cus.Name}</p>
                                <p className={classes.Column}>Table No. <strong>{cus.TableNo}</strong></p>
                                <p className={classes.ColumnRight}>Contact No. {cus.PhnNo}</p>
                            </div>
                            <p className={classes.Price}>Total Price is: <strong>{totalprice}</strong></p>
                            <button className={classes.Check} onClick={() => props.gotoOrderdetails(url)}>Check Order Details</button>
                        </div>)
                }
                else {
                    return (null);
                }
            }
        default:
            return null;
    }

}

export default adminSales;