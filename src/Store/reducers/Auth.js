import * as actions from '../actions/actions'


const initialState ={
    token:null,
    userId:null,
    error:false,
    loading:false,
}
const reducer = (state=initialState,action)=>
{
    switch(action.type)
    {
        case actions.AUTH_START:
            {
                return{
                    ...state,
                    error:false,
                    loading:true
                 }
            }
        case actions.AUTH_SUCCESS:
            {
                return{
                    ...state,
                    token:action.idToken,
                    error:false,
                    loading:false,
                    userId:action.userId
                }
            }
        case actions.AUTH_FAIL:
            {
                return{
                    ...state,
                    error:true,
                    loading:false
                }
            }
        case actions.AUTH_LOGOUT:
            {
                return{
                    ...state,
                    token:null,
                    userId:null
                }
            }
        default: return state
    }
}

export default reducer;