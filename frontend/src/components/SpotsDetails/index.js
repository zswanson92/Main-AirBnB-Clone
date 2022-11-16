import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import { getAllSpots, deleteSpot, getSpotById } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import './SpotsDetails.css'
import EditSpotButton from '../EditSpot';

const SpotsDetails = ({ user }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const spotDetailsObj = useSelector(state => {
        // console.log("this is spotDetailsObj", state.spots.spot[59])
        return state.spots.spot[spotId]
    })

    console.log("THIS IS USER", user)

    const deleteASpot = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        return history.push('/')
      }

    useEffect(() => {
        dispatch(getSpotById(spotId))
      }, [dispatch])


    if(!spotDetailsObj){
        return null
    }

    return (
        <div className='center'>
            <h1 className='test'>{spotDetailsObj?.name}</h1>
            <p>{spotDetailsObj?.address}, {spotDetailsObj?.city}, {spotDetailsObj?.state}, {spotDetailsObj?.country}</p>
            <img
            src={`${spotDetailsObj?.SpotImages[0].url}`}
            alt=''/>
            <p>Average Rating: {spotDetailsObj?.avgRating} stars</p>
            <p>Price: ${spotDetailsObj?.price}</p>
            <p>Latitude: {spotDetailsObj?.lat}</p>
            <p>Longitude: {spotDetailsObj?.lng}</p>
            <button onClick={deleteASpot} className='delete-button'> Delete Location </button>
            {/* <button className='edit-spot-button'>Edit Location Details</button> */}
            {user ? <EditSpotButton /> : null}
        </div>
    )
}

export default SpotsDetails
