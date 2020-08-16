import * as actionTypes from '../actions/actions';
import axios from 'axios';
export const addBIngredient = (name) =>
{
    return{
        type:actionTypes.ADD_BINGREDIENT,
        ingredientName: name
    };
};

export const removeBIngredient = (name) =>
{
    return{
        type: actionTypes.REMOVE_BINGREDIENT,
        ingredientName: name
    }
}
export const setSpice = (spice) => {
    return {
        type: actionTypes.SET_SPICE,
        spice: spice
    }
}

export const setBIngredients = (ingredients) =>
{
    return{
        type:actionTypes.SET_BINGREDIENTS,
        ingredients: ingredients
    }
}

export const initBIngredients =() =>
{
    return dispatch=>
    {
        axios.get('https://custom-menu-generator.firebaseio.com/burgerIngredients.json').then(
            response =>{
                dispatch(setBIngredients(response.data));
            }
        ).catch(error =>
            {
                dispatch(fetchBIngredientsFailed());
            })
    }
}

export const fetchBIngredientsFailed =() =>
{
    return {
        type:actionTypes.FETCH_BINGREDIENTS_FAILED
    }
}