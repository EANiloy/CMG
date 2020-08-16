import axios from 'axios';
import * as actionTypes from './actions';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout =()=>
{
    localStorage.removeItem("token")
    localStorage.removeItem("expirationTime")
    localStorage.removeItem("userId")
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () =>
{
    return dispatch=>
    {
        const token = localStorage.getItem("token");
        if(!token)
        {
            dispatch(logout())
        }
        else
        {
            const exptime = new Date (localStorage.getItem("expirationTime"))
            if(exptime > new Date())
            {
                const userId = localStorage.getItem("userId")
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((exptime.getTime()-new Date().getTime())/1000))
            }
            else{
                dispatch(logout())
            }

        }
    }
}

export const checkAuthTimeout =(timeout)=>{
    return dispatch=>
    {
        setTimeout(()=>
        {
            dispatch(logout());
        },timeout*1000)
    }
}

export const signin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAV-_DWAZIv8Ah6Q2kZ3FX11zNKvOZTz5U', authData, {
            validateStatus: function (status) {
                return status < 500;
            }
        }).then(res => {
            if (res.status === 400) {
                  dispatch(authFail())
            }
            else{
                const expirationTime = new Date (new Date().getTime() + res.data.expiresIn *1000)
                localStorage.setItem("token",res.data.idToken)
                localStorage.setItem("userId",res.data.localId)
                localStorage.setItem("expirationTime",expirationTime)
                dispatch(authSuccess(res.data.idToken,res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            }
        }
        ).catch(err => {
            console.log(err)
        })
    };
};