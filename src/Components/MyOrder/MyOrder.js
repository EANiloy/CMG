import  React from 'react';
import classes from './MyOrder.css';
const order =(props) =>
{
    let Order = null
    let orderItems = []
    let menu = []
    menu.push({...props.data.order})
    menu = menu[0]
    if(menu.type==="SetMenu")
    {
        orderItems = menu.items
        Order=(
            <div className={classes.Details}>
                    <p className={classes.Title}>Set Menu</p>
                    <p>Items are: </p>
                    {orderItems.map(item=>
                        {
                            return(
                                <li className={classes.Items} key = {menu.menuNo+item}>{item}</li>
                            )
                        })}
                    <div className={classes.BuyInfo}>
                    <p className={classes.Price}>Price: <strong>{menu.price}</strong></p>
                    <button className={classes.Delete} onClick={()=>props.Delete(props.data.id,menu.price)}>Remove Item</button>
                    </div>
            </div>
        )
    }
    else if(menu.type==="Pizza" )
    {
        orderItems = menu.ingredients
        let ingredients = []

        ingredients = Object.keys(orderItems).map(item=>
            {
                return ([item,orderItems[item]])
            })
            let selectedIngredients = ingredients.map(item=>
                {
                    if(item[1]===0)
                    {
                        return null
                    }
                    else{
                        return item
                    }
                })
            let filteredIngredients = selectedIngredients.filter(el=>{
                return el!==null
            }
            )
        Order=(
            <div className={classes.Details}>
                    <p className={classes.PizzaTitle}>One Delicious {menu.size} Inches {menu.base} Pizza with the followings</p>
                    {filteredIngredients.map(ig=>{
                    return(
                        <li className={classes.Items} key={ig[0]}>{ig[0]}</li>
                    )
                    })}
                <div className={classes.BuyInfo}>
                    <p className={classes.Price}>Price: <strong>{menu.price}</strong></p>
                    <button className={classes.Delete} onClick={() => props.Delete(props.data.id,menu.price)}>Remove Item</button>
                </div>
            </div>
        )
    }
    else if (menu.type === "Burger") {
        orderItems = menu.ingredients
        let ingredients = []

        ingredients = Object.keys(orderItems).map(item => {
            return ([item, orderItems[item]])
        })
        let selectedIngredients = ingredients.map(ing=>
            {
                if(ing[1]===0)
                    return null
                else
                    return ing
            })
        let filteredIngredients = selectedIngredients.filter(el=>
            {
                return el!==null
            })
        Order = (
            <div className={classes.Details}>
                <p className={classes.BurgerTitle}>One Delicious Burger with the followings</p>
                {filteredIngredients.map(ig => {
                    return (
                        <li className={classes.Items} key={ig[0]}>{ig[0]}: {ig[1]}</li>
                    )
                })}
                <p>Spice Level : {menu.spicelevel}</p>
                <div className={classes.BuyInfo}>
                    <p className={classes.Price}>Price: <strong>{menu.price}</strong></p>
                    <button className={classes.Delete} onClick={() => props.Delete(props.data.id,menu.price)}>Remove Item</button>
                </div>
            </div>
        )
    }
    return(
        <div className={classes.Orders}>
            {Order}
        </div>
    )
}
export default order; 