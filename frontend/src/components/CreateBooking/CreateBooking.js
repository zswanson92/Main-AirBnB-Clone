import './CreateBooking.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import * as bookingActions from '../../store/bookings'
import * as spotActions from '../../store/spots'
import { getBookingsThunk } from '../../store/bookings';
import { Modal } from '../../context/Modal'


function CreateBookingButton() {
  const dispatch = useDispatch();
  const { spotId } = useParams()

  const currBooking = useSelector(state => state.bookings?.allBookings?.Bookings)

  console.log("CURR BOOKING", currBooking)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [errors, setErrors] = useState([])

  const [showReviewForm, setReviewForm] = useState(false)


  useEffect(() => {
    let err = []
    if(dateCheck(startDate) || dateCheck(endDate)){
      err.push("This date range is already booked. Please choose a different one.")
    }

    setErrors(err)
  }, [startDate, endDate])

  const createNewBooking = async (e) => {
    e.preventDefault();

    const createdBooking = {
      startDate, endDate, spotId
    }

    await dispatch(bookingActions.createBookingThunk(createdBooking))
    // await dispatch(reviewActions.getAllReviews(spotId))
    await dispatch(spotActions.getSpotById(spotId))
    await dispatch(getBookingsThunk(spotId))
    setStartDate("")
    setEndDate("")
    setReviewForm(false)
  }

  const dateCheck = (date) => {

    let abc = currBooking.filter((el) => {
      // console.log("THIS IS DATE!!!", date)
      // console.log("THIS IS EL!!!", el.startDate.slice(0, 10))

      return date === el.startDate.slice(0, 10) || (date > el.startDate.slice(0, 10) && date < el.endDate.slice(0 ,10)) || (date === el.endDate.slice(0, 10))

    })
    // console.log("ABC", abc)
    if(abc.length > 0){
      return true
    }
    return false
  }

  console.log("START DATE", startDate)
  console.log("END DATE", endDate)
  console.log("DIFF", endDate - startDate)


  return (
    <>
      {/* <button onClick={() => setReviewForm(true)} className='createbooking-button'> Create a booking</button> */}
      {
        // showReviewForm ? <Modal>

          <form onSubmit={createNewBooking} className="new-booking-form">
            <div className='test-div-create-book'>
            <div className='enter-date-div'>
              CHECK-IN
              <input
                className='date-inputs'
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required={true} />
            </div>
            <div className='enter-date-div'>
              CHECKOUT
              <input
                className='date-inputs'
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required={true} />
            </div>
            </div>
            {errors.length > 0 ? <div>This date range is already booked. Please choose a different one.</div> : <div> &nbsp; </div>}
            <button disabled={(dateCheck(startDate) || dateCheck(endDate)) ? true : false} type="submit" className="submitbooking-button">Reserve</button>
            {/* <button onClick={() => setReviewForm(false)} className='discardreviewform-button'>Close Form</button> */}
          </form>

      }
    </>
  )
}

export default CreateBookingButton


{/* </Modal> : "" */}
