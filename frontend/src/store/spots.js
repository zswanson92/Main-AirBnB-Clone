import { csrfFetch } from './csrf';

export const LOAD_SPOTS = 'spots/LOAD'
export const ADD_SPOT = 'spots/ADD'

const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

const add = (spot) => ({
    type: ADD_SPOT,
    spot
})

export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`)

    if(response.ok){
        const spots = await response.json()
        // console.log("THIS IS SPOTS", spots.Spots)
        dispatch(load(spots.Spots))
    }
}

// export const getAllSpotImages = () => async dispatch => {
//     const response = await fetch()
// }

export const createSpot = (payload) => async dispatch => {
    const { name, description, address, city, country, state, lat, lng, price, url, preview } = payload
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price, url, preview })
    })

    if(response.ok){
        const spot = await response.json()
        dispatch(add(spot))
        return spot
    }
}



const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:
            const newState = []
            action.spots.forEach(spot => {
                // newState[spot.id] = spot
                newState.push(spot)
            })
            return newState

        case ADD_SPOT:
            return {
                ...state,
                    ...state.Spots,
                    [action.spotId]: {
                        id: action.spotId,
                        name: action.name,
                        address: action.address,
                        city: action.city,
                        state: action.state,
                        country: action.country,
                        lat: action.lat,
                        lng: action.lng,
                        description: action.description,
                        price: action.price
                }
            }

    default:
        return state;
    }
}

export default spotsReducer
