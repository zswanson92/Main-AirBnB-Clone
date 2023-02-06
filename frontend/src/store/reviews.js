import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/LOAD'
const ADD_REVIEWS = 'reviews/ADD'
const DELETE_REVIEWS = 'reviews/DELETE'
const EDIT_REVIEW = 'review/EDIT'

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

const reviewEdit = (review) => ({
    type: EDIT_REVIEW,
    payload: review
})

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const review = await response.json()
        dispatch(reviewLoad(review))
        return review
    }
}

export const createReview = (payload, spotId) => async dispatch => {
    const { review, stars } = payload
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review, stars })
    })

    if (response.ok) {
        const review = await response.json()
        dispatch(reviewAdd(review))
    }
}

export const editReviewThunk = (payload) => async dispatch => {
    const { reviewId, review, stars } = payload
    // console.log(+stars)

    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reviewId, review, stars })
    })

    if (response.ok) {
        const editedReview = await response.json()

        dispatch(reviewEdit(editedReview))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',

    })

    if (response.ok) {
        const deletedReview = await response.json()
        dispatch(reviewDelete(deletedReview))
    }
}




let initialState = {}

const reviewsReducer = (state = initialState, action) => {
    // let newState;
    // let newState = { ...state }
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = { ...state }
            newState.allReviews = {}
            const reviews = action.reviews
            newState.allReviews = reviews
            return newState
        }
        // const reviews = action.reviews
        // console.log("THIS IS LOAD REVIEWS", reviews.Reviews[0])
        // console.log("THIS IS NEWSTATE.SPOT", newState.spot)
        // console.log(action.reviews.Reviews[0].spotId)


        // reviews.Reviews.map(review => newState[action.reviews.Reviews[action.reviews.Reviews.length - 1].id] = review)

        // return newState





        case DELETE_REVIEWS: {
            let newState = { ...state }
            delete newState[action.reviewId]

            return newState
        }
        // console.log("this is action", action)



        case ADD_REVIEWS: {
            let newState = { ...state }
            newState[action.review.id] = action.review
            // console.log("THIS IS newStateTwo after update", newStateTwo)
            return newState
        }
        // let newStateTwo = { ...state }
        // console.log("this is action", action)
        // console.log("THIS IS newStateTwo before update", newStateTwo)
        // newState[action.id] = action.review.spotId
        // newState[action.review.id] = action.review
        // console.log("THIS IS newStateTwo after update", newStateTwo)
        // return newState

        case EDIT_REVIEW: {
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        }


        default: return state
    }

}

export default reviewsReducer
