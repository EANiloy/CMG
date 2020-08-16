import React from 'react';
import Auxilliary from '../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) =>
{
    const ingredientsSummary = Object.keys(props.ingredients).map(
        igKey =>
        {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]===1 ? "Yes" : "No"}</li>
        }
    );
    return(
        <Auxilliary>
            <h4>A Delicious Pizza with the following ingredients : </h4>
            <ul>    
                {ingredientsSummary}
                <li>Size: {props.size} Inches in diameter</li>
                <li>Base Ingredient: {props.Base}</li>
            </ul>
            <p><strong>Total Price: {props.price}</strong> (Vat Inclusive)</p>
            <p>Add to cart?</p>
            <Button btnType ="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType ="Success" clicked={props.purchaseContinued}>Add</Button>
        </Auxilliary>
    );

}
;

export default orderSummary;