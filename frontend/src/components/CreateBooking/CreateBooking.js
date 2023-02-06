import './CreateBooking.css'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import * as bookingActions from '../../store/bookings'
import * as spotActions from '../../store/spots'
import { getBookingsThunk } from '../../store/bookings';
import { Modal } from '../../context/Modal'


function CreateBookingButton() {
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
      <button onClick={() => setReviewForm(true)} className='createbooking-button'> Create a booking</button>
      {
        showReviewForm ? <Modal>
          <form onSubmit={createNewBooking} className="new-booking-form">
            <div className='enter-date-div'>
              Enter start date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required={true} />
            </div>
            <div className='enter-date-div'>
              Enter end date
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required={true} />
            </div>
            <button type="submit" className="submitreview-button">Submit booking request</button>
            <button onClick={() => setReviewForm(false)} className='discardreviewform-button'>Close Form</button>
          </form> </Modal> : ""
      }
    </>
  )
}

export default CreateBookingButton
