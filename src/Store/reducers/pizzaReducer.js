import * as actionTypes from '../actions/actions';

const Size_Prices =
{
    small: 125,
    medium: 150,
    large: 200
}
const INGREDIENT_PRICES =
{
    cheese: 50,
    mushrooms: 100,
    pepperoni: 150,
    sauce: 80,
    bacon: 150
}
const initialState =
{
    pingredients: null,
    ptotalPrice: 100,
    size: 0,
    base: null,
    sizeaddition: 0,
    error:false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PINGREDIENT:
            return {
                ...state,
                pingredients:
                {
                    ...state.pingredients,
                    [action.ingredientName]: state.pingredients[action.ingredientName] + 1
                },
                ptotalPrice: state.ptotalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_PINGREDIENT:
            return {
                ...state,
                pingredients:
                {
                    ...state.pingredients,
                    [action.ingredientName]: state.pingredients[action.ingredientName] - 1
                },
                ptotalPrice: state.ptotalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_SIZE:
            let ptotalPrice=0;
            let Size=0;
            let SizeAddition = 0;
            if (action.size === '1') {
                Size = 6;
                if (state.sizeaddition === Size_Prices.medium) {
                    let removePrice = Size_Prices.medium;
                    let current = state.ptotalPrice - removePrice;
                    let newPrice = current + Size_Prices.small;
                    ptotalPrice = newPrice;
                    SizeAddition= Size_Prices.small;
                }
                else if (state.sizeaddition === Size_Prices.large) {
                    let removePrice = Size_Prices.large;
                    let current = state.ptotalPrice - removePrice;
                    let newPrice = current + Size_Prices.small;
                    ptotalPrice = newPrice;
                    SizeAddition =  Size_Prices.small;
                }
                else {
                    let newPrice = state.ptotalPrice + Size_Prices.small;
                    ptotalPrice = newPrice;
                    SizeAddition= Size_Prices.small;
                }
            }
            else if (action.size === '2') {
                Size = 8;
                if (state.sizeaddition === Size_Prices.small) {
                    let removePrice = Size_Prices.small;
                    let current = state.ptotalPrice - removePrice;
                    let newPrice = current + Size_Prices.medium;
                    ptotalPrice = newPrice;
                    SizeAddition = Size_Prices.medium;
                }
                else if (state.sizeaddition === Size_Prices.large) {
                    let removePrice = Size_Prices.large;
                    let current = state.ptotalPrice - removePrice;
                    let newPrice = current + Size_Prices.medium;
                    ptotalPrice = newPrice;
                    SizeAddition= Size_Prices.medium;
                }
                else {
                    let newPrice = state.ptotalPrice + Size_Prices.medium;
                    ptotalPrice = newPrice;
                    SizeAddition= Size_Prices.medium;
                }
            }
            else if (action.size === '3') {
                    Size= 12;
                if (state.sizeaddition === Size_Prices.small) {
                    let removePrice = Size_Prices.small;
                    let current = state.ptotalPrice - removePrice;
                    let newPrice = current + Size_Prices.large;
                    ptotalPrice = newPrice;
                    SizeAddition= Size_Prices.large;
                }
                else if (state.sizeaddition === Size_Prices.medium) {
                    let removePrice = Size_Prices.medium;
                    let current = state.ptotalPrice - removePrice;
                    let newPrice = current + Size_Prices.large;
                    ptotalPrice = newPrice;
                    SizeAddition = Size_Prices.large;
                }
                else {
                    let newPrice = state.ptotalPrice + Size_Prices.large;
                    ptotalPrice = newPrice;
                    SizeAddition = Size_Prices.large;
                }
            }
            return{
                ...state,
                ptotalPrice:ptotalPrice,
                sizeaddition:SizeAddition,
                size:Size,
                
            }
        case actionTypes.SET_BASE:
            {
                return{
                    ...state,
                    base:action.base
                }
            }
        case actionTypes.SET_PINGREDIENTS:
            return {
                ...state,
                pingredients: {
                    pepperoni: action.ingredients.pepperoni,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    mushrooms: action.ingredients.mushrooms,
                    sauce: action.ingredients.sauce
                },
                error: false
            }
        case actionTypes.FETCH_PINGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};
export default reducer;