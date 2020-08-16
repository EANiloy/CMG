import React from 'react';
import classes from './EmployeeOrder.css';
const employeeOrder =(props)=>
{
    let pick = React.useState(false)
    let serve = React.useState(true)
    const picked = () => {
        pick[1]=(true)
        serve[1]=(false)
    }
    const served = () => {
        serve[1](true)
    }
    let id = props.data[0]
    let info = props.data[1]
    let cusInfo = info.information
    let orderInfo = info.orderinfo
    let TableNo = cusInfo.TableNo
    let CusName = cusInfo.Name
    let Orders = []
    for (let each in orderInfo) {
        Orders.push(orderInfo[each].order)
    }
    let item = null
    let indexes = []
    for (let i = 0; i < Orders.length; i++) {
        if (Orders[i].status !== "Served" && Orders[i].status !== "Canceled") {
            indexes.push(i);
        }
    }
    item = Orders.map(el => {
        let list = null
        if (el.status !== "Served" && el.status !== "Canceled"  ) {
            if (el.type === "SetMenu") {
                list = el.items.map(each => {
                    return <li key={each + Math.random()}>{each}</li>
                });
            }
            else if (el.type === "Burger") {
                let ingredients = el.ingredients
                list = Object.keys(ingredients).map(each => {
                    return <li key={each + Math.random()}>{each} : {ingredients[each]}</li>
                });
            }
            else if (el.type === "Pizza") {
                let ingredients = el.ingredients
                list = Object.keys(ingredients).map(each => {
                    return <li key={each + Math.random()}>{each} : {ingredients[each] ? "Yes" : "No"}</li>
                });
            }
            if (el.status === "Preparing") {
                pick[0] = true
                serve[0] = false
            }
            return (
                <div key={el.menuNo + Math.random()}>
                    {el.type === "SetMenu" ? <p><strong>Menu no : {el.menuNo}</strong></p> : <p><strong>{el.type}</strong></p>}
                    <p>{list}</p>
                    {el.type === "Burger" ?
                        <p>Spice Level : {el.spicelevel}</p> : null}
                    {el.type === "Pizza" ?
                        <p>Base Ingredient : {el.base}</p> : null}
                    <p>Status : <strong>{el.status}</strong></p>
                </div>
            );
        }
        else
        {
            return(null);
        }
    })
    item = item.filter(el => {
        return (el !== null);
    });
    return (
        item.length !== 0 ?
            <div className={classes.Order}>
                <h2>Pending Order</h2>
                <h3><u>{cusInfo.TableNo}</u></h3>
                {item}
                <div className={classes.Buttons}>
                    <button className={classes.Serving} disabled={pick[0]} onClick={(folderid, tableNo, index) => { props.PickedUp(id, TableNo, CusName, indexes); picked() }}>Pick up Order</button>
                    <button className={classes.Served} disabled={serve[0]} onClick={(folderid, tableNo, index) => { props.Served(id, TableNo, CusName, indexes); served() }}>Serve Order</button>
                </div>
            </div> : null
    );
}

export default employeeOrder;