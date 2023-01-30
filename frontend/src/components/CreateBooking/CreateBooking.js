import './CreateBooking.css'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import * as bookingActions from '../../store/bookings'
import * as spotActions from '../../store/spots'
import { getBookingsThunk } from '../../store/bookings';



function CreateBookingButton (){
    const dispatch = useDispatch();
    const { spotId } = useParams()

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [showReviewForm, setReviewForm] = useState(false)

    const createNewBooking = async (e) => {
        e.preventDefault();

        const createdBooking = {
            startDate, endDate, spotId
        }

        await dispatch(bookingActions.createBookingThunk(createdBooking))
        // await dispatch(reviewActions.getAllReviews(spotId))
        await dispatch(spotActions.getSpotById(spotId))
        await dispatch(getBookingsThunk(spotId))
        setReviewForm(false)
      }

    return (
        <>
        {
            showReviewForm ?
        <form onSubmit={createNewBooking} className="newreview-form">
          <label>Enter start date</label>
            <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required={true}/>
          <label>Enter end date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required={true}/>
          <button type="submit" className="submitreview-button">Submit booking request</button>
          <button onClick={() => setReviewForm(false)} className='discardreviewform-button'>Close Form</button>
        </form> : (<button onClick={() => setReviewForm(true)} className='createreview-button'> Create a booking</button>
        )}
        </>
      )
}

export default CreateBookingButton
