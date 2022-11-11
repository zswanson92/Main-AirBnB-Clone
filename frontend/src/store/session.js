import { csrfFetch } from './csrf';

// pojo action creators
export const SET = 'session/SET'
export const REMOVE = 'session/REMOVE'


// actions
export const setSessionUser = (inputParam) => {
    return {
        type: SET,
        payload: inputParam
    }
}

export const removeSessionUser = () => {
    return {
        type: REMOVE
    }
}

// thunks
export const login = (user) => async dispatch => {
    const { credential, password } = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    // if(response.ok){
        const theUser = await response.json()
        dispatch(setSessionUser(theUser))
        return response
    // }
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setSessionUser(data));
    return response;
  };


let initialState = {
    user: null
}

// REDUCER

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SET:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state
    }
}

export default sessionReducer;
