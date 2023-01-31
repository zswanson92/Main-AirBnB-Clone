import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpot, getSpotById } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { useParams, useHistory, Link } from 'react-router-dom';
import './SpotsDetails.css'
import EditSpotButton from '../EditSpot';
import { getAllReviews, deleteReview } from '../../store/reviews';
import CreateReviewButton from '../CreateReview';
import CreateSpotButton from '../CreateSpot';
import CreateBookingButton from '../CreateBooking/CreateBooking';
import { getBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
    console.log("!!!!!!", spotDetailsObj)

    const reviewDetailsObj = useSelector(state => {
        // console.log("THIS IS REVIEWDETAILSOBJ", state.reviews)
        return state.reviews
    })

    const bookingDetailsObj = useSelector(state => {
        return state.bookings.allBookings?.Bookings
    })

    const filteredBookingArr = bookingDetailsObj?.filter((obj) => obj.spotId === +spotId)


    // console.log("This is booking details object", bookingDetailsObj)
    console.log("This is FILTERED booking details object", filteredBookingArr)



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
        dispatch(getBookingsThunk(spotId))
    }

    const deleteAReview = (e) => {
        e.preventDefault();
        dispatch(deleteReview(e.target.id))

        dispatch(getSpotById(spotId))
        // return history.push(`/`)
    }

    useEffect(() => {
        dispatch(getSpotById(spotId))
        if (spotDetailsObj?.numReviews > 0) dispatch(getAllReviews(spotId))
        dispatch(getBookingsThunk(spotId))
    }, [dispatch, spotId])
    // if something breaks I added spotId to dependency

    if (!spotDetailsObj) {
        return null
    }

    let markedDay = {}

    filteredBookingArr?.map((item) => {
        console.log("THIS IS ITEM", item)
        markedDay[item.startDate] = {
            selected: true,
            marked: true,
            selectedColor: "purple",
        };
    });

    return (
        <div className='main-details-page'>
            {/* {sessionUser ? <CreateSpotButton /> : null} */}
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
                    {filteredReviewArr.map(review => (<div key={review.id}>

                        <li key={review.id} className='reviews-li'>"{review?.review}"</li>
                        {sessionUser && (sessionUser?.id === review?.User?.id ? <button className='remove-review-button' id={review.id} onClick={deleteAReview}>Remove Review</button> : null)}
                    </div>))}
                </ul>
            </div>
            <div className='current-bookings-div'>
                <div>Current Bookings for this location:</div>
                {filteredBookingArr?.map((booking) => {
                    return <div key={booking.id} className='current-bookings-div'>
                        {console.log(booking)}
                        Start {sortFunc(booking.startDate.slice(0, 10).split('-')).join('-')} - End {sortFunc(booking.endDate.slice(0, 10).split('-')).join('-')}
                        {<Calendar value={[new Date(booking.startDate.slice(0, 10).split('-')), new Date(booking.endDate.slice(0, 10).split('-'))]} />}
                        {sessionUser?.id === booking.userId ? <button onClick={(e) => deleteABooking(e, booking.id)}>Delete Booking</button> : ""}
                        {sessionUser?.id === booking.userId ? <Link to={`/bookings/${booking.id}`}><button>Edit Booking</button></Link> : ""}

                        </div>
                })}
            </div>

        </div>
    )
}
export default SpotsDetails


// activeStartDate={new Date(booking.startDate.slice(0, 10).split('-'))}
