import './EditBooking.css'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import * as bookingActions from '../../store/bookings'
// import * as spotActions from '../../store/spots'
// import { getBookingsThunk } from '../../store/bookings';



function EditBookingButton() {
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
    if (newBooking) {
      await history.push(`/spots/${newBooking?.spotId}`)
    }
    // setReviewForm(false)
  }

  const goBack = (e) => {
    e.preventDefault();

    history.goBack()
  }

  return (
    <>
      <form onSubmit={editBooking} className="edit-booking-form">
        <div className='edit-booking-div'>
          Enter start date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required={true} />
        </div>
        <div className='edit-booking-div'>
          Enter end date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required={true} />
        </div>
        <button type="submit" className="submitreview-button">Submit edited booking request</button>
        <button onClick={goBack} className='discardreviewform-button'>Return to location</button>
      </form>
    </>
  )
}

export default EditBookingButton
