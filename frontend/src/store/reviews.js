import { csrfFetch } from './csrf';

export const LOAD_REVIEWS = 'reviews/LOAD'
export const ADD_REVIEWS = 'reviews/ADD'
export const DELETE_REVIEWS = 'reviews/DELETE'

const reviewLoad = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const reviewAdd = (review) => ({
    type: ADD_REVIEWS,
    review
})

const reviewDelete = (reviewId) => ({
    type: DELETE_REVIEWS,
    reviewId
})

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        const review = await response.json()
        dispatch(reviewLoad(review))
    }
}

export const createReview = (payload, spotId) => async dispatch => {
    const { review, stars } = payload
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review, stars })
    })

    // console.log("this is the response body", response.body)
    if(response.ok){
        const review = await response.json()
        console.log("this is the response body", review)
        dispatch(reviewAdd(review))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        const deletedReview = await response.json()
        console.log("this is deleted review", deletedReview)
        dispatch(reviewDelete(reviewId))
        // return deletedReview
    }
}




let initialState = {}

const reviewsReducer = (state = initialState, action) => {
    // let newState;
    let newState = { ...state }
    switch(action.type){
        case LOAD_REVIEWS:
            const reviews = action.reviews
            // console.log("THIS IS LOAD REVIEWS", reviews.Reviews[0])
            // console.log("THIS IS NEWSTATE.SPOT", newState.spot)
            // console.log(action.reviews.Reviews[0].spotId)
            reviews.Reviews.map(review => newState[action.reviews.Reviews[action.reviews.Reviews.length - 1].id] = review)

            return newState


        case DELETE_REVIEWS:
        // console.log("this is action", action)
        delete newState[action.reviewId]

        return newState


        case ADD_REVIEWS:
            // let newStateTwo = { ...state }
            // console.log("this is action", action)
            // console.log("THIS IS newStateTwo before update", newStateTwo)
            // newState[action.id] = action.review.spotId
            newState[action.review.id] = action.review
            // console.log("THIS IS newStateTwo after update", newStateTwo)
            return newState



        default: return state
    }

}

export default reviewsReducer
