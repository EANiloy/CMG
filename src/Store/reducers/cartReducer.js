import * as orderActions from '../actions/order';

const initialState =
{
    orders:[],
    totalPrice:0,
    countmin:2,
    countsec:60
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case orderActions.ADD_CART:
            let newTotalPrice = state.totalPrice + action.price
            return {
                ...state,
                    orders: state.orders.concat({id:new Date().getTime(), order: action.order}),
                    totalPrice:newTotalPrice
            };
        case orderActions.REMOVE_CART:
            {
             const newOrders = state.orders.filter(result=>result.id !== action.remElId);   
             let newTotalPrice = state.totalPrice - action.price
                return{
                    ...state,
                    orders:newOrders,
                    totalPrice : newTotalPrice
                }
            }
        case orderActions.REDUCE_TIMER:
            {
                let countsec = state.countsec - 1
                let countmin = state.countmin 
                if(countsec ===0)
                {
                    countmin = countmin - 1
                    countsec = 60
                }
                if(countmin ===0)
                {
                    countmin=0
                    countsec=0
                }
                return{
                    ...state,
                    countsec:countsec,
                    countmin:countmin
                }
            }
        case orderActions.RESET_TIMER:
        {
                return{
                    ...state,
                    countmin:3,
                    countsec:60
                }
        }
        default:
            return state;
    }
};
export default reducer;