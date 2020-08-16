import * as actionTypes from '../actions/actions';
import axios from 'axios';
export const addPIngredient = (name) => {
    return {
        type: actionTypes.ADD_PINGREDIENT,
        ingredientName: name
    };
};

export const removePIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_PINGREDIENT,
        ingredientName: name
    }
}

export const setSize = (size) =>{
    return{
        type:actionTypes.SET_SIZE,
        size:size
    }
}

export const setBase = (base) => {
    return {
        type: actionTypes.SET_BASE,
        base: base
    }
}
export const setPIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_PINGREDIENTS,
        ingredients: ingredients
    }
}

export const initPIngredients = () => {
    return dispatch => {
        axios.get('https://custom-menu-generator.firebaseio.com/pizzaIngredients.json').then(
            response => {
                dispatch(setPIngredients(response.data));
            }
        ).catch(error => {
            dispatch(fetchPIngredientsFailed());
        })
    }
}

export const fetchPIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_PINGREDIENTS_FAILED
    }
}