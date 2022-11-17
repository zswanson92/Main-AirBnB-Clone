import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import { getAllSpots, deleteSpot, getSpotById } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import './SpotsDetails.css'
import EditSpotButton from '../EditSpot';
import { getAllReviews } from '../../store/reviews';

const SpotsDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    // console.log("THIS IS SESSIONUSER", sessionUser.id)

    const spotDetailsObj = useSelector(state => {
        // console.log("this is spotDetailsObj", state.spots.spot[59])
        return state.spots.spot[spotId]
    })

    const reviewDetailsObj = useSelector(state => {
        console.log("THIS IS REVIEWDETAILSOBJ", state.reviews)
        return state.reviews
    })


    const deleteASpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        return history.push('/')
      }

    useEffect(() => {
        dispatch(getSpotById(spotId))
        dispatch(getAllReviews(spotId))
      }, [dispatch])


    if(!spotDetailsObj){
        return null
    }

    return (
        <div className='center'>
            <h1 className='test'>{spotDetailsObj?.name}</h1>
            <p>{spotDetailsObj?.address}, {spotDetailsObj?.city}, {spotDetailsObj?.state}, {spotDetailsObj?.country}</p>
            <img
            src={spotDetailsObj?.SpotImages ? `${spotDetailsObj?.SpotImages[0].url}` : null}
            alt=''/>
            <p>Average Rating: {spotDetailsObj?.avgRating} stars</p>
            <p>Price: ${spotDetailsObj?.price}</p>
            <p>Latitude: {spotDetailsObj?.lat}</p>
            <p>Longitude: {spotDetailsObj?.lng}</p>

            {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <button onClick={deleteASpot} className='delete-button'> Delete Location </button> : null)}

            {/* <button className='edit-spot-button'>Edit Location Details</button> */}
            {/* {user ? <EditSpotButton /> : null} */}
            {sessionUser && (sessionUser.id === spotDetailsObj?.Owner.id ? <EditSpotButton /> : null)}
            {{reviewDetailsObj} && (reviewDetailsObj.spot[spotId]) ? (<p>Review: {reviewDetailsObj?.spot[spotId].review}</p>) : (<p>There are no reviews</p>)}
        </div>
    )
}

export default SpotsDetails
