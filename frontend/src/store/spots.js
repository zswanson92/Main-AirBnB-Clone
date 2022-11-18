import { csrfFetch } from './csrf';

export const LOAD_SPOT = 'spots/LOAD/BYID'
export const LOAD_SPOTS = 'spots/LOAD'
export const ADD_SPOT = 'spots/ADD'
export const DELETE_SPOT = 'spots/DELETE'
export const EDIT_SPOT = 'spots/EDIT'
// export const ADD_IMAGE = 'spotsImage/ADD'

const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

const add = (spot) => ({
    type: ADD_SPOT,
    spot
})

const deleteASpot = (id) => ({
    type: DELETE_SPOT,
    id
})

const edit = (updatedSpot) => ({
    type: EDIT_SPOT,
    updatedSpot
})

const loadASpot = (spot) => ({
    type: LOAD_SPOT,
    spot
})

// const addImage = (spot) => ({
//     type: ADD_IMAGE,
//     spot
// })

export const getSpotById = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok){
        const spot = await response.json()
        // console.log('this is spot', spot)
        dispatch(loadASpot(spot))
    }
}


export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`)

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
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price })
    })

    if(response.ok){
        const spot = await response.json()

        const imageRes = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, preview })
        })

        if(imageRes.ok){
            const image = await imageRes.json()
            spot.url = image.url
            spot.previewImage = image.preview
            dispatch(add(spot))
        }
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        const deletedSpot = await response.json()
        dispatch(deleteASpot(deletedSpot))
    }
}

export const editSpot = (spotId, payload) => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price } = payload
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price })
    })

    if(response.ok){
        const editedSpot = await response.json()
        console.log("this is edited spot from thunk", editedSpot)
        dispatch(edit(editedSpot))
        return editedSpot
    }
}




const spotsReducer = (state = { spot: {}, allSpots: {} }, action) => {
    let editState = { ...state }
    switch(action.type){


        case LOAD_SPOTS:
            const newState = {spot: {}, allSpots: {}}
            action.spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState

        case LOAD_SPOT:
            const newStateTwo = { ...state }
            newStateTwo.spot[action.spot.id] = action.spot
            // console.log("this is editState", newStateTwo)
            return newStateTwo

        case ADD_SPOT:
            return {
                ...editState,
                    // ...editState.Spots,
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
                        price: action.price,
                        url: action.url,
                        preview: action.preview
                }
            }
        case DELETE_SPOT:
            // delete editState[action.spotId]
            // return editState
            let thirdNewState = { ...state }
            delete thirdNewState[action.spotId]
            return thirdNewState

        case EDIT_SPOT:
            let theUpdatedSpot = action.spot
            editState[action.spotId] = theUpdatedSpot
            return editState

    default:
        return state;
    }
}

export default spotsReducer
