import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import { getAllSpots, deleteSpot } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import './SpotsDetails.css'

const SpotsDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const spotDetailsObj = useSelector(state => {
        return state.spots.allSpots
    })

    // const spotDetails = Object.values(spotDetailsObj)

    const deleteASpot = (e) => {
        e.preventDefault();

        dispatch(deleteSpot(spotId))

        return history.push('/')
      }


    useEffect(() => {
        dispatch(getAllSpots())
      }, [dispatch])


    if(!spotDetailsObj){
        return null
    }

    return (
        <div className='center'>
            <h1 className='test'>{spotDetailsObj[spotId]?.name}</h1>
            <p>{spotDetailsObj[spotId]?.address}, {spotDetailsObj[spotId]?.city}, {spotDetailsObj[spotId]?.state}, {spotDetailsObj[spotId]?.country}</p>
            <img
            src={`${spotDetailsObj[spotId]?.previewImage}`}
            alt=''/>
            <p>Average Rating: {spotDetailsObj[spotId]?.avgRating} stars</p>
            <p>Price: ${spotDetailsObj[spotId]?.price}</p>
            <p>Latitude: {spotDetailsObj[spotId]?.lat}</p>
            <p>Longitude: {spotDetailsObj[spotId]?.lng}</p>
            <button onClick={deleteASpot}> Delete Location </button>
        </div>
    )
}

export default SpotsDetails
