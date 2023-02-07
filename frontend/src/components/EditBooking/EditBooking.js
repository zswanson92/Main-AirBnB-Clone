import './EditBooking.css'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import * as bookingActions from '../../store/bookings'
// import * as spotActions from '../../store/spots'
// import { getBookingsThunk } from '../../store/bookings';



function EditBookingButton() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { bookingId } = useParams()

  const currBooking = useSelector(state => state.bookings?.allBookings.Bookings)
  // console.log("CURR BOOKING", currBooking)

  const bookingFilter = currBooking?.filter(obj => obj.id === +bookingId)

  let editValOne;
  let editValTwo;

  const workAround = bookingFilter ? editValOne = bookingFilter[0]?.startDate : ""
  const workAroundTwo = bookingFilter ? editValTwo = bookingFilter[0]?.endDate : ""


  const [startDate, setStartDate] = useState(editValOne ? editValOne.slice(0, 10) : "")
  const [endDate, setEndDate] = useState(editValTwo ? editValTwo.slice(0, 10) : "")

  // const [showReviewForm, setReviewForm] = useState(false)

  const editBooking = async (e) => {
    e.preventDefault();

    const editedBooking = {
      startDate, endDate
    }

    await dispatch(bookingActions.editBookingThunk(bookingId, editedBooking))

    history.goBack()
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
