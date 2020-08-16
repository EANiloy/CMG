import React from 'react';
import classes from './Pizza.css';
import PizzaIngredients from './PizzaIngredients/PizzaIngredients';
const pizza = (props) =>
{
    const assignedClass =[];
    assignedClass.push(classes.Pizza);
    let transformedIngredients = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i)=>
             {
                 return <PizzaIngredients key={igKey +i} type={igKey}/>
             }); // An array with the number of ingredients
        }
    ).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);
    if(transformedIngredients.length===0)
    {
        transformedIngredients = <p>Please Start Adding Ingredients!</p>
    }
    else{
            assignedClass.push(classes.Animation);
    }
    return(
        <div className ={assignedClass.join(' ')}>
            <PizzaIngredients type="base"/>
            {transformedIngredients}
        </div>
    );
}

export default pizza;