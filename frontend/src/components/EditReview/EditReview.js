import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { editReviewThunk } from "../../store/reviews";
import './EditReview.css'
// import { Modal } from '../../context/Modal'



const EditReviewButton = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { reviewId } = useParams()


    const currReview = useSelector(state => state.reviews.allReviews.Reviews)

    const revFilter = currReview?.filter(obj => obj.id === +reviewId)

    let editValOne;
    let editValTwo;

    const workAround = revFilter ? editValOne = revFilter[0]?.review : ""
    const workAroundTwo = revFilter ? editValTwo = revFilter[0]?.stars : ""


    const [review, setReview] = useState(editValOne ? editValOne : "")
    const [stars, setStars] = useState(editValTwo ? editValTwo : "")
    const [errors, setErrors] = useState([])


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



    const editCurrReview = async (e) => {
        e.preventDefault();

        if (errors.length > 0) return;

        const editedReview = {
            review,
            stars,
            reviewId
        }

        await dispatch(editReviewThunk(editedReview))
        history.goBack()
    }

    // const goBack = () => {
    //     history.goBack()
    // }

    return (
        <div className="edit-review-container-div">
            <form onSubmit={editCurrReview} className="edit-review-form">
                {/* {errors.length > 0 && (
                    <ul className="edit-review-ul-errors">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )} */}
                <div className="edit-review-input-divs-container">
                    <div className="edit-review-text-area-div">
                        <textarea
                            placeholder="Review"
                            className="create-review-inputfield"
                            type='text'
                            name='review-body'
                            value={review}
                            required={true}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                        {review?.length < 10 ? <div className="falsey-review-form-body-input">Review must be at least 10 characters long.</div> : ""}
                        {review?.length > 255 ? <div className="falsey-review-form-body-input">Review must be less than 255 characters long.</div> : ""}
                    </div>
                    <div className="stars-edit-review-input-div">
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                                required />
                            Stars (1-5)
                            {stars < 1 || stars > 5 ? <div className="falsey-review-form-body-input">Stars must be between 1 and 5.</div> : ""}
                    </div>
                </div>
                <div className="edit-review-button-div">
                    <button disabled={errors.length > 0 ? true : false} type='submit' className="submit-edited-review-button">Submit Edited Review</button>
                    {/* <button className="submit-edited-review-button">Close</button> */}
                </div>
            </form>
        </div>
    )
}

export default EditReviewButton;
