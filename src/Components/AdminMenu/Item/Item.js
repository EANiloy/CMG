import React from 'react';

import classes from './Item.css';
const item = (props) => {
    return (
        <div className={classes.Post}>
            <p className={classes.Title}>Set Menu {props.menuno}</p>
            <div className={classes.Items}>
                <p>Items are :</p>
                <ul>
                    {props.names.map(item => {
                        return (<li key={props.menuno + item}>{item}</li>)
                    })}
                </ul>
            </div>
            <div className={classes.BuyInfo}>
                <p className={classes.Price}><strong>Price: {props.price} Taka</strong></p>
           
                <button className={classes.Button} onClick={()=>props.Edit(props.menuno)}>Edit Menu</button>
                <button className={classes.Button} onClick={()=>props.Delete(props.menuno)}>Delete Menu</button>
            </div>
        </div>)
}

export default item;