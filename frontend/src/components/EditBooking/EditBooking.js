import './EditBooking.css'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import * as bookingActions from '../../store/bookings'
// import * as spotActions from '../../store/spots'
// import { getBookingsThunk } from '../../store/bookings';



function EditBookingButton (){
    let history = useHistory();
    const dispatch = useDispatch();
    const { bookingId } = useParams()

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    // const [showReviewForm, setReviewForm] = useState(false)

    const editBooking = async (e) => {
        e.preventDefault();

        const editedBooking = {
            startDate, endDate
        }


        const newBooking = await dispatch(bookingActions.editBookingThunk(bookingId, editedBooking))
        // await dispatch(reviewActions.getAllReviews(spotId))
        // await dispatch(spotActions.getSpotById(spotId))
        // await dispatch(getBookingsThunk(spotId))
        if(newBooking){
            await history.push(`/spots/${newBooking?.spotId}`)
        }
        // setReviewForm(false)
      }

    return (
        <>
        <form onSubmit={editBooking} className="newreview-form">
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
          <button type="submit" className="submitreview-button">Submit booking edit request</button>
          <button className='discardreviewform-button'>Close Form</button>
        </form>
        </>
      )
}

export default EditBookingButton
