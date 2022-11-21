import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import * as reviewActions from '../../store/reviews'
import * as spotActions from '../../store/spots'
// import { Redirect, useHistory } from "react-router-dom";
import './CreateReview.css'
// import { Modal } from '../../context/Modal'


function CreateReviewButton (){
    // const history = useHistory()
    const dispatch = useDispatch();
    const { spotId } = useParams()

    const [review, setReview] = useState("")
    const [stars, setStars] = useState(1)

    const [showReviewForm, setReviewForm] = useState(false)

    const createNewReview = async (e) => {
        e.preventDefault();

        const createdReview = {
            stars, review
        }

        await dispatch(reviewActions.createReview(createdReview, spotId))
        await dispatch(reviewActions.getAllReviews(spotId))
        await dispatch(spotActions.getSpotById(spotId))

        // dispatch(spotActions.getAllSpots())

      }

    return (
        <>
        {/* <button>TEST BUTTON</button> */}
        {
            showReviewForm ?
        <form onSubmit={createNewReview} className="newreview-form">
          <label className="stars-label">
            <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required/>
            Stars (1-5)
          </label>
          <label>
          Review
          <textarea
            className="review-textarea"
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required/>

          </label>
          <button type="submit" className="submitreview-button">Submit Review</button>
          <button onClick={() => setReviewForm(false)} className='discardreviewform-button'>Close Form</button>
        </form> : (<button onClick={() => setReviewForm(true)} className='createreview-button'> Leave a Review</button>
        )}
        </>
      )
}

export default CreateReviewButton
