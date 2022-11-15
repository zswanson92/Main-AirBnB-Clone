import { csrfFetch } from './csrf';

export const LOAD_SPOTS = 'spots/LOAD'
export const ADD_SPOT = 'spots/ADD'
// export const ADD_IMAGE = 'spotsImage/ADD'

const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

const add = (spot) => ({
    type: ADD_SPOT,
    spot
})

// const addImage = (spot) => ({
//     type: ADD_IMAGE,
//     spot
// })

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

// export const createSpotImage = (payload) => async dispatch => {
//     const { url, preview, spotId } = payload
//     const response = await csrfFetch(`api/${spotId}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ url, preview })
//     })

//     if(response.ok){
//         const spotImage = await response.json()
//         dispatch(addImage(spotImage))
//     }
// }




const initialState = {}

const spotsReducer = (state = initialState, action) => {
    const editState = { ...state}
    switch(action.type){
        case LOAD_SPOTS:
            const newState = []
            action.spots.forEach(spot => {
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
                        price: action.price,
                        url: action.url,
                        preview: action.preview
                }
            }
        // case ADD_IMAGE:
        //     return {
        //             ...state.Spots,
        //             [action.spotId]: {
        //                 url: action.url,
        //                 preview: action.preview
        //             }
        //     }
    default:
        return state;
    }
}

export default spotsReducer
