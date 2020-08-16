import React from 'react';
import classes from './AdminOrder.css';
const adminOrder =(props)=>
{
    let id = props.data.id
    let date = props.data.date
    let cus = props.data.information
    let orderinfo = props.data.orderinfo
    
    let status=null;
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
    let search = parseInt(props.search,10);
    let orderMonth = null
    let firstslash = date.indexOf("/")
    orderMonth = date.slice(firstslash+1)
    let secondslash = orderMonth.indexOf("/")
    orderMonth = orderMonth.slice(0,secondslash)
    orderMonth = parseInt(orderMonth,10);
    let day = new Date();
    let today = day.getDate()+"/"+day.getMonth()+"/"+day.getFullYear()  
    let month = day.getMonth();

        let item = null
        item = Orders.map(el => {
        let list = null
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
            status=el.status
            return (
                <div key={el.menuNo + Math.random()} className={classes.Each}>
                    {el.type === "SetMenu" ? <p><strong>Menu no : {el.menuNo}</strong></p> : <p><strong>{el.type}</strong></p>}
                    <p>{list}</p>
                    {el.type === "Burger" ?
                        <p>Spice Level : {el.spicelevel}</p> : null}
                    {el.type === "Pizza" ?
                        <p>Base Ingredient : {el.base}</p> : null}
                    <p>Status : <strong>{el.status}</strong></p>
                    <p>Price : <strong>{el.price}</strong></p>
                </div>
            );
            })
                item = item.filter(el => {
                    return (el !== null);
                });
            
        switch(props.type)
        {
           case "all":
               {
                   return(
                    <div className={classes.Order}>
                        <h4 className={classes.ID}>Order ID: {id}</h4>
                        <h5>Date: {date}</h5>
                        <div className={classes.Row}>
                            <p className={classes.Column}>Customer Name: {cus.Name}</p>
                            <p className={classes.Column}>Table No. <strong>{cus.TableNo}</strong></p>
                            <p className={classes.ColumnRight}>Contact No. {cus.PhnNo}</p>
                        </div>
                        <div className={classes.Item}>
                            {item}
                        </div>
                    </div>)
               }
            case "today":
                {
                    if(date===today)
                    {
                        return (
                            <div className={classes.Order}>
                                <h4 className={classes.ID}>Order ID: {id}</h4>
                                <h5>Date: {date}</h5>
                                <div className={classes.Row}>
                                    <p className={classes.Column}>Customer Name: {cus.Name}</p>
                                    <p className={classes.Column}>Table No. <strong>{cus.TableNo}</strong></p>
                                    <p className={classes.ColumnRight}>Contact No. {cus.PhnNo}</p>
                                </div>
                                <div className={classes.Item}>
                                    {item}
                                </div>
                            </div>)
                    }
                    else
                    return(null)
                }
            case "monthly":
                {
                    if(orderMonth === month)
                    {
                        return (
                            <div className={classes.Order}>
                                <h4 className={classes.ID}>Order ID: {id}</h4>
                                <h5>Date: {date}</h5>
                                <div className={classes.Row}>
                                    <p className={classes.Column}>Customer Name: {cus.Name}</p>
                                    <p className={classes.Column}>Table No. <strong>{cus.TableNo}</strong></p>
                                    <p className={classes.ColumnRight}>Contact No. {cus.PhnNo}</p>
                                </div>
                                <div className={classes.Item}>
                                    {item}
                                </div>
                            </div>)
                    }
                    else
                    {
                    return (null);
                    }
                }
            case "specific":
                {
                    if(search === id)
                    {
                        return (
                            <div className={classes.Order}>
                                <h4 className={classes.ID}>Order ID: {id}</h4>
                                <h5>Date: {date}</h5>
                                <div className={classes.Row}>
                                    <p className={classes.Column}>Customer Name: {cus.Name}</p>
                                    <p className={classes.ColumnMiddle}>Table No. <strong>{cus.TableNo}</strong></p>
                                    <p className={classes.ColumnRight}>Contact No. {cus.PhnNo}</p>
                                </div>
                                <div className={classes.Item}>
                                    {item}
                                </div>
                                {(status !== "Served" && status !=="Canceled")?
                                <button className={classes.Cancel} onClick={()=>props.Canceled(cus.TableNo,cus.Name,props.folder,indexes)}>Cancel Order</button>
                                :null}
                            </div>)
                    }
                    else
                    {
                        return(
                           null
                        )
                    }
                }
                default:
                    return null;
        }
        
}

export default adminOrder;