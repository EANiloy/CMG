import * as actionTypes from '../actions/actions';


const INGREDIENT_PRICES =
{
    cheese: 20,
    salad: 15,
    chicken: 70,
    beef: 80,
    bacon: 40
}

const initialState =
{
    bingredients: null,
    btotalPrice: 35,
    error:false,
    spice:null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_BINGREDIENT:
            return {
                ...state,
                bingredients:
                {
                    ...state.bingredients,
                    [action.ingredientName]: state.bingredients[action.ingredientName] + 1
                },
                btotalPrice: state.btotalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_BINGREDIENT:
            return {
                ...state,
                bingredients:
                {
                    ...state.bingredients,
                    [action.ingredientName]: state.bingredients[action.ingredientName] - 1
                },
                btotalPrice: state.btotalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_BINGREDIENTS:
            return{
                ...state,
                bingredients:{
                    cheese: action.ingredients.cheese,
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    beef: action.ingredients.beef,
                    chicken: action.ingredients.chicken
                },
                error:false
            }
        case actionTypes.FETCH_BINGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        case actionTypes.SET_SPICE:
            {
                return {
                    ...state,
                    spice: action.spice
                }
            }
        default:
            return state;
    }
};
export default reducer;