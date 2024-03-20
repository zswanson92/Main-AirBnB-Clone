import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteSpot, getSpotById } from '../../store/spots';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
import './SpotsDetails.css'
import EditSpotButton from '../EditSpot';
import { getAllReviews, deleteReview } from '../../store/reviews';
import CreateReviewButton from '../CreateReview';
import CreateBookingButton from '../CreateBooking/CreateBooking';
import { getBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";


const SpotsDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user);

    const spotDetailsObj = useSelector(state => {
        return state.spots.spot[spotId]
    })

    const reviewDetailsObj = useSelector(state => {
        return state.reviews.allReviews?.Reviews
    })

    const bookingDetailsObj = useSelector(state => {
        return state.bookings.allBookings?.Bookings
    })

    const filteredBookingArr = bookingDetailsObj?.filter((obj) => obj.spotId === +spotId)

    const currUserBookings = filteredBookingArr?.filter((obj) => obj.userId === sessionUser?.id)

    const testCurrBooking = currUserBookings.sort((a, b) => {
        let keyA = new Date(a.startDate)
        let keyB = new Date(b.startDate)
        if(keyA < keyB) return -1
        if(keyA > keyB) return 1
        return 0
    })


    let sortFunc = (arr) => {
        let newArr = []

        newArr.push(arr[1])
        newArr.push(arr[2])
        newArr.push(arr[0])

        return newArr
    }

    let reviewArr;

    if (reviewDetailsObj) {
        reviewArr = Object.values(reviewDetailsObj)
    }


    let filteredReviewArr;

    if (reviewArr) {
        filteredReviewArr = reviewArr.filter(review => review.spotId == spotId)
    }

    const deleteASpot = async (e) => {
        e.preventDefault();
        await dispatch(deleteSpot(spotId))
        return history.push('/')
    }

    const deleteABooking = async (e, bookingId) => {
        e.preventDefault();
        await dispatch(deleteBookingThunk(bookingId))
        await dispatch(getBookingsThunk(spotId))
    }

    const deleteAReview = async (e, reviewId) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId))
        await dispatch(getAllReviews(spotId))

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


    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }


    const tileDisable = ({ activeStartDate, date, view }) => {
        const today = new Date()
        if (date.toDateString() === today.toDateString()) {
            return true
        }

        for (let bookId in bookingDetailsObj) {
            let start = new Date(bookingDetailsObj[bookId].startDate)
            let end = new Date(bookingDetailsObj[bookId].endDate)
            end = end.addDays(1)
            // start = start.addDays(1)
            date = new Date(date)

            if (date >= start && date < end) {
                return true
            }
        }
        return false
    }

    return (
        <div className='main-details-page'>
            {/* {sessionUser ? <CreateSpotButton /> : null} */}
            <div className='name-address-details-div'>
                <h1 className='test'>{spotDetailsObj?.name}</h1>
                <p className='add-city-state-country'> Average Rating: {spotDetailsObj?.avgRating} &nbsp; <IconContext.Provider value={{ color: 'black' }} >
                    <FaStar />
                </IconContext.Provider> &nbsp; · &nbsp; {spotDetailsObj?.address}, {spotDetailsObj?.city}, {spotDetailsObj?.state}, {spotDetailsObj?.country}  · Latitude: {spotDetailsObj?.lat}° · Longitude: {spotDetailsObj?.lng}°
                </p>
            </div>
            <div className='spot-details-img'>
                <img

                    src={spotDetailsObj?.SpotImages ? `${spotDetailsObj?.SpotImages[spotDetailsObj?.SpotImages.length - 1].url}` : null}

                    alt=''
                    className='actual-details-image'
                />

            </div>
            <div className='delete-edit-buttons-div'>
                {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <button onClick={deleteASpot} className='delete-button'> Delete Location </button> : null)}

                {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <EditSpotButton /> : null)}
            </div>
            <div className='kekw-div'>
                <div className='sub-kek-div'>
                <div className='top-description-div'>Description:</div>
                <div className='description-div'> {spotDetailsObj?.description}</div>
                </div>
                {/* <div className='price-detail'>Price Per Night: ${spotDetailsObj?.price}</div> */}
                <div className='bnb-clone-create'>
                <div className='price-per-night-div'>${spotDetailsObj?.price} Night</div>
                <div> &nbsp; <IconContext.Provider value={{ color: 'black' }} >
                    <FaStar />
                </IconContext.Provider> {spotDetailsObj?.avgRating} · {filteredReviewArr?.length} reviews</div>
                <CreateBookingButton />
            </div>
            </div>
            <div className='reviews-p'>Reviews: </div>
            <div className='reviews-ul-div'>

                <div className='reviews-ul'>

                    {filteredReviewArr?.map(review => (<div className='filtered-rev-map-div' key={review.id}>
                        {/* {console.log("THIS IS REVIEW", review)} */}
                        <div className='reviews-li'>"{review?.review}" &nbsp; · &nbsp; {review?.stars} &nbsp;
                            <IconContext.Provider value={{ color: 'black' }} >
                                <FaStar />
                            </IconContext.Provider>
                        </div>
                        <div className='review-info-div'>{review?.User.firstName} {review?.User.lastName} · {sortFunc(review?.updatedAt.slice(0, 10).split('-')).join('-')}</div>
                        {/* <div>{sortFunc(review?.updatedAt.slice(0, 10).split('-')).join('-')}</div> */}
                        {sessionUser && (sessionUser?.id === review?.User?.id ? <div className='remove-review-butt-div'><button key={review.id} className='remove-review-button' onClick={(e) => deleteAReview(e, review.id)}>Remove Review</button> <Link to={`/reviews/${review.id}`}><button className='remove-review-button'>Edit Review</button></Link></div> : null)}
                        {/* {sessionUser && (sessionUser?.id === review?.User?.id ? <div className='remove-review-butt-div'><Link to={`/reviews/${review.id}`}><button>TEST</button></Link></div> : null)} */}
                    </div>))}
                </div>
                <div className='current-bookings-div'>
                    <Calendar
                        tileDisabled={tileDisable}
                    />
                    {sessionUser && ((sessionUser.id !== spotDetailsObj?.Owner.id && currUserBookings?.length > 0) ? <div className='under-calendar-div'>Your current Bookings for this location:</div> : "")}

                    {testCurrBooking?.map((booking) => {
                        return <div key={booking.id} className='mapped-bookings-div'>
                            {sessionUser?.id === booking.userId ? <div className='start-end-div'> Start {sortFunc(booking.startDate.slice(0, 10).split('-')).join('-')} - End {sortFunc(booking.endDate.slice(0, 10).split('-')).join('-')}</div> : ""}
                            <div className='calendar-two-buttons-div'>
                                {sessionUser?.id === booking.userId ? <button className='delete-booking-button' onClick={(e) => deleteABooking(e, booking.id)}>Delete Booking</button> : ""}
                                {sessionUser?.id === booking.userId ? <Link to={`/bookings/${booking.id}`}><button className='edit-booking-button'>Edit Booking</button></Link> : ""}
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <footer className='cred-footer'>
                <div className='foot-div'>
                    <div className='corp-div-holder'>© 2022 UltimateZnB Corp</div>
                    <div className='foot-name-div'><a className='zack-anchor' href='https://github.com/zswanson92'>Zack Swanson</a></div>
                    <a href='https://github.com/zswanson92'> <img src='https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' alt='Logo' className='splash-logo-img'></img></a></div>
            </footer>
        </div>
    )
}
export default SpotsDetails
