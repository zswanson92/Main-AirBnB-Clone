import { csrfFetch } from './csrf';

const ADD_BOOKING = 'booking/ADD'
const EDIT_BOOKING = 'booking/EDIT'
const DELETE_BOOKING = 'booking/DELETE'
const GET_BOOKINGS = 'booking/GET'

const bookingAdd = (booking) => ({
    type: ADD_BOOKING,
    payload: booking
})

const bookingLoad = (booking) => ({
    type: GET_BOOKINGS,
    payload: booking
})

const deleteBooking = (booking) => ({
    type: DELETE_BOOKING,
    payload: booking
})

const editBooking = (booking) => ({
    type: EDIT_BOOKING,
    payload: booking
})


export const editBookingThunk = (bookingId, payload) => async dispatch => {
    const { startDate, endDate } = payload
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate, endDate })
    })

    if(response.ok){
        const editedBooking = await response.json()
        dispatch(editBooking(editedBooking))
        return editedBooking
    }
}


export const deleteBookingThunk = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        const deletedBooking = await response.json()
        dispatch(deleteBooking(deletedBooking))
    }
}


export const createBookingThunk = (payload) => async dispatch => {
    const { startDate, endDate, spotId } = payload
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate, endDate })
    })

    if(response.ok){
        const booking = await response.json()
        dispatch(bookingAdd(booking))
        return booking
    }
}

export const getBookingsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if(response.ok){
        const bookings = await response.json()
        dispatch(bookingLoad(bookings))
        return bookings
    }
}







let initialState = {}
const bookingsReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_BOOKING: {
            const newState = {
                ...state,
                [action.payload.id]: {
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate
                }
            }
            return newState
        }

        case GET_BOOKINGS: {
            const newState = Object.assign({}, state)
            newState.allBookings = {}
            const bookings = (action.payload)
            newState.allBookings = bookings
            return newState
        }

        case DELETE_BOOKING: {
            const newState = { ...state }
            delete newState[action.bookingId]
            return newState
        }

        case EDIT_BOOKING: {
            const newState = { ...state }
            let updatedBooking = action.booking
            newState[action.bookingId] = updatedBooking
            return newState
        }


        default:
            return state;
    }
}


export default bookingsReducer;
