import React from 'react';
import Item from './Item/Item';
import classes from './AdminMenu.css';
const adminMenu = (props) => {
    let sets = [props.data.items]
    let items = []
    for (let item in sets) {
        items.push(Object.entries(sets[item]))
    }
    items = items.reduce((arr, el) => {
        return (arr.concat(el))
    }, [])
    items = items.flat();
    let itemName = []
    let itemPrice = 0
    let setMenu = null;
    items.map((item, i) => {
        if (i % 2 !== 1) {
            itemName.push(items[i])
        }
        else {
            itemPrice = itemPrice + items[i]
        }
        return (null)
    })
    setMenu = <Item menuno={props.data.id} names={itemName} price={itemPrice} key={props.data.id} Edit={props.Edit} Delete={props.Delete}/>
    return (
        <div className={classes.Items}>
            {setMenu}
        </div>
    )
}

export default adminMenu;