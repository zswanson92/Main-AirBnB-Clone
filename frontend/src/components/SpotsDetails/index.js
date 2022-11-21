import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import { deleteSpot, getSpotById } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import './SpotsDetails.css'
import EditSpotButton from '../EditSpot';
import { getAllReviews, deleteReview } from '../../store/reviews';
import CreateReviewButton from '../CreateReview';
import CreateSpotButton from '../CreateSpot';

const SpotsDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    // console.log("THIS IS SESSIONUSER", sessionUser.id)

    const spotDetailsObj = useSelector(state => {
        // console.log("this is spotDetailsObj", state.spots.spot[76])
        return state.spots.spot[spotId]
    })

    const reviewDetailsObj = useSelector(state => {
        // console.log("THIS IS REVIEWDETAILSOBJ", state.reviews)
        return state.reviews
    })
    const reviewArr = Object.values(reviewDetailsObj)
    // console.log("this is review array", reviewArr)

    const filteredReviewArr = reviewArr.filter(review => review.spotId == spotId)

    // console.log("this is filtered review", filteredReviewArr)


    const deleteASpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        return history.push('/')
      }

    const deleteAReview = (e) => {
        e.preventDefault();
        dispatch(deleteReview(e.target.id))

        dispatch(getSpotById(spotId))
        // return history.push(`/`)
    }

    useEffect(() => {
        dispatch(getSpotById(spotId))
        dispatch(getAllReviews(spotId))
      }, [dispatch, spotId])
      // if something breaks I added spotId to dependency

    if(!spotDetailsObj){
        return null
    }

    return (
        <div className='main-details-page'>
            {sessionUser ? <CreateSpotButton /> : null}
            <div className='name-address-details-div'>
            <h1 className='test'>{spotDetailsObj?.name}</h1>
            <p className='add-city-state-country'> Average Rating: {spotDetailsObj?.avgRating} ★ · {spotDetailsObj?.address}, {spotDetailsObj?.city}, {spotDetailsObj?.state}, {spotDetailsObj?.country} · Latitude: {spotDetailsObj?.lat} Longitude: {spotDetailsObj?.lng}
            </p>
            </div>
            <div className='spot-details-img'>
            <img

            src={spotDetailsObj?.SpotImages ? `${spotDetailsObj?.SpotImages[0].url}` : null}

            alt=''
            className='actual-details-image'
             />
            </div>
            {/* <p className='avg-rating'>Average Rating: {spotDetailsObj?.avgRating} ★</p> */}
            <p className='price-detail'>Price Per Night: ${spotDetailsObj?.price}</p>
            {/* <p className='latitude-detail'>Latitude: {spotDetailsObj?.lat}</p>
            <p className='longitude-detail'>Longitude: {spotDetailsObj?.lng}</p> */}
            {sessionUser && (sessionUser.id !== spotDetailsObj?.Owner.id ? <CreateReviewButton /> : null)}
            <div className='delete-edit-buttons-div'>
            {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <button onClick={deleteASpot} className='delete-button'> Delete Location </button> : null)}
            {/* {sessionUser && (<CreateReviewButton />)} */}

            {/* <button className='edit-spot-button'>Edit Location Details</button> */}
            {/* {user ? <EditSpotButton /> : null} */}
            {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <EditSpotButton /> : null)}
            </div>
            {/* {{reviewDetailsObj}  ? (<p>Review: {reviewDetailsObj[spotId]?.review}</p>) : (<p>There are no reviews</p>)} */}
            <div className='reviews-ul-div'>
            <p>Reviews: </p>
            <ul className='reviews-ul'>
                {filteredReviewArr.map(review => (<>
                    {/* {console.log("this is a REVIEW from my MAP method", sessionUser)} */}
                    {/* {review.spotId === spotId ? <p>Reviews: {review?.review}</p> : null} */}

                    <li className='reviews-li'>"{review?.review}"</li>
                    {/* {console.log(review)} */}
                    {sessionUser && (sessionUser?.id === review?.User?.id ? <button className='remove-review-button' id={review.id} onClick={deleteAReview}>Remove Review</button> : null)}
                </>))}
            </ul>
            </div>
        </div>
    )
}
// && (reviewDetailsObj.spot[spotId])
export default SpotsDetails
