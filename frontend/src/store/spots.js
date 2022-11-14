export const LOAD_SPOTS = 'spots/LOAD'

const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`)

    if(response.ok){
        const spots = await response.json()
        // console.log("THIS IS SPOTS", spots.Spots)
        dispatch(load(spots.Spots))
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
    default:
        return state;
    }
}

export default spotsReducer
