import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import * as reviewActions from '../../store/reviews'
import * as spotActions from '../../store/spots'
// import { Redirect, useHistory } from "react-router-dom";
import './CreateReview.css'
import { Modal } from '../../context/Modal'


function CreateReviewButton() {
  // const history = useHistory()
  const dispatch = useDispatch();
  const { spotId } = useParams()

  const [review, setReview] = useState("")
  const [stars, setStars] = useState(1)
  const [errors, setErrors] = useState([])

  const [showReviewForm, setReviewForm] = useState(false)

  useEffect(() => {
    const err = []

    if (review?.length < 10) {
      err.push("Review must be at least 10 characters long.")
    }
    if (stars < 1 || stars > 5) {
      err.push("Stars must be a value between 1 and 5.")
    }
    setErrors(err)
  }, [review, stars])

  const createNewReview = async (e) => {
    e.preventDefault();

    const createdReview = {
      stars, review
    }

    await dispatch(reviewActions.createReview(createdReview, spotId))
    await dispatch(reviewActions.getAllReviews(spotId))
    await dispatch(spotActions.getSpotById(spotId))

    // dispatch(spotActions.getAllSpots())
    setReviewForm(false)
    setReview("")
    setStars(1)
  }

  return (
    <>
      <button onClick={() => setReviewForm(true)} className='createreview-button'> Leave a Review</button>
      {

        showReviewForm ? <Modal>
          <form onSubmit={createNewReview} className="newreview-form">
            <div className="create-review-ta">
              Review:
              <textarea
                className="review-textarea"
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required />
              {review?.length && review?.length < 10 ? <div className="falsey-review-form-body-input">Review must be at least 10 characters long.</div> : <div> &nbsp; </div>}
              {review?.length > 255 ? <div className="falsey-review-form-body-input">Review must be less than 255 characters long.</div> : <div> &nbsp; </div>}
            </div>
            <div className="stars-div">
              <input
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required />
              Stars (1-5)
            </div>
            {stars < 1 || stars > 5 ? <div className="falsey-review-form-body-input">Stars must be between 1 and 5.</div> : <div> &nbsp; </div>}
            <button disabled={errors.length > 0 ? true : false} type="submit" className="submitreview-button">Submit Review</button>
            <button onClick={() => setReviewForm(false)} className='discardreviewform-button'>Close Form</button>
          </form> </Modal> : ""
      }
    </>
  )
}

export default CreateReviewButton
