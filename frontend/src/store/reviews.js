import { csrfFetch } from './csrf';

export const LOAD_REVIEWS = 'reviews/LOAD'

const reviewLoad = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        const review = await response.json()
        dispatch(reviewLoad(review))
    }
}






let initialState = { spot: {} }

const reviewsReducer = (state = initialState, action) => {
    // let newState;
    switch(action.type){
        case LOAD_REVIEWS:
            let newState = { ...state }

            const reviews = action.reviews
            console.log("THIS IS LOAD REVIEWS", reviews.Reviews[0])
            console.log("THIS IS NEWSTATE.SPOT", newState.spot)
            reviews.Reviews.map(review => newState.spot[review.id] = review)

            return newState

        default: return state
    }

}

export default reviewsReducer
