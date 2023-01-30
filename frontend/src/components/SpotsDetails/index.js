import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpot, getSpotById } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import './SpotsDetails.css'
import EditSpotButton from '../EditSpot';
import { getAllReviews, deleteReview } from '../../store/reviews';
import CreateReviewButton from '../CreateReview';
import CreateSpotButton from '../CreateSpot';
import CreateBookingButton from '../CreateBooking/CreateBooking';
import { getBookingsThunk, deleteBookingThunk } from '../../store/bookings';

const SpotsDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    // console.log("THIS IS SESSIONUSER", sessionUser.id)

    const spotDetailsObj = useSelector(state => {
        // console.log("this is spotDetailsObj", state.spots.spot[76])
        return state.spots.spot[spotId]
    })

    const reviewDetailsObj = useSelector(state => {
        // console.log("THIS IS REVIEWDETAILSOBJ", state.reviews)
        return state.reviews
    })

    const bookingDetailsObj = useSelector(state => {
        return state.bookings.allBookings?.Bookings
    })

    console.log("This is booking details object", bookingDetailsObj)


    let sortFunc = (arr) => {
        let newArr = []

        newArr.push(arr[1])
        newArr.push(arr[2])
        newArr.push(arr[0])

        return newArr
    }


    const reviewArr = Object.values(reviewDetailsObj)

    const filteredReviewArr = reviewArr.filter(review => review.spotId == spotId)


    const deleteASpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        return history.push('/')
    }

    const deleteABooking = (e, bookingId) => {
        e.preventDefault();
        dispatch(deleteBookingThunk(bookingId))
        // dispatch(getSpotById(spotId))
        dispatch(getBookingsThunk(spotId))
        // return history.push(`/spots/${spotId}`)
    }

    const deleteAReview = (e) => {
        e.preventDefault();
        dispatch(deleteReview(e.target.id))

        dispatch(getSpotById(spotId))
        // return history.push(`/`)
    }

    useEffect(() => {
        dispatch(getSpotById(spotId))
        dispatch(getAllReviews(spotId))
        dispatch(getBookingsThunk(spotId))
    }, [dispatch, spotId])
    // if something breaks I added spotId to dependency

    if (!spotDetailsObj) {
        return null
    }

    return (
        <div className='main-details-page'>
            {sessionUser ? <CreateSpotButton /> : null}
            <div className='name-address-details-div'>
                <h1 className='test'>{spotDetailsObj?.name}</h1>
                <p className='add-city-state-country'> Average Rating: {spotDetailsObj?.avgRating} ★ · {spotDetailsObj?.address}, {spotDetailsObj?.city}, {spotDetailsObj?.state}, {spotDetailsObj?.country} · Latitude: {spotDetailsObj?.lat} Longitude: {spotDetailsObj?.lng}
                </p>
            </div>
            <div className='spot-details-img'>
                <img

                    src={spotDetailsObj?.SpotImages ? `${spotDetailsObj?.SpotImages[0].url}` : null}

                    alt=''
                    className='actual-details-image'
                />

            </div>
            <div className='description-div'>Description: {spotDetailsObj?.description}</div>

            <div className='price-detail'>Price Per Night: ${spotDetailsObj?.price}</div>

            {sessionUser && (sessionUser.id !== spotDetailsObj?.Owner.id ? <CreateReviewButton /> : null)}
            {sessionUser && (sessionUser.id !== spotDetailsObj?.Owner.id ? <CreateBookingButton /> : null)}
            <div className='delete-edit-buttons-div'>
                {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <button onClick={deleteASpot} className='delete-button'> Delete Location </button> : null)}

                {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <EditSpotButton /> : null)}
            </div>

            <div className='reviews-ul-div'>
                <p>Reviews: </p>
                <ul className='reviews-ul'>
                    {filteredReviewArr.map(review => (<>

                        <li key={review.id} className='reviews-li'>"{review?.review}"</li>
                        {sessionUser && (sessionUser?.id === review?.User?.id ? <button className='remove-review-button' id={review.id} onClick={deleteAReview}>Remove Review</button> : null)}
                    </>))}
                </ul>
            </div>
            <div>
                <div>Current Bookings for this location:</div>
                {bookingDetailsObj?.map((booking) => {
                    return <div key={booking.id}>
                        {console.log(booking)}
                        <div>Start {sortFunc(booking.startDate.slice(0, 10).split('-')).join('-')} - End {sortFunc(booking.endDate.slice(0, 10).split('-')).join('-')}</div>
                        {sessionUser?.id === booking.userId ? <button onClick={(e) => deleteABooking(e, booking.id)}>Delete Booking</button> : ""}
                        {/* <p></p> */}
                        {/* <button>Delete book</button> */}
                    </div>
                })}
            </div>
        </div>
    )
}
export default SpotsDetails
