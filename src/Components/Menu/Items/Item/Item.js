import React from 'react';

import classes from './Item.css';
const item = (props) =>  
{
    const addToCart = (props) => {
        let order = {
            menuNo: props.menuno,
            items: props.names,
            price: props.price,
            type: "SetMenu",
            status:"Pending"
        }
        props.onOrdered(order);
    }
    return(
    <div className={classes.Post}>
        <p className={classes.Title}>Set Menu {props.menuno}</p>
        <div>
            <p>Items are :</p>
            <ul>
                {props.names.map(item=>
                    {
                        return(<li key={props.menuno+item}>{item}</li>)
                    })}
            </ul>
            </div>
            <div className={classes.BuyInfo}>
                <p className={classes.Price}><strong>Price: {props.price} Taka</strong></p>
                <button className={classes.Add} onClick={()=>addToCart(props)}>Add to cart</button>
            </div>
    </div>)
    }

export default item;