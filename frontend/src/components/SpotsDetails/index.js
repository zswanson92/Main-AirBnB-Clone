import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotsDetails.css'

const SpotsDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const spotDetails = useSelector(state => {
        return state.spots
    })

    console.log("THIS IS USE SELECTOR SPOTDETAILS", spotDetails)

    useEffect(() => {
        dispatch(getAllSpots())
      }, [dispatch])


    if(!spotDetails){
        return null
    }

    return (
        <div className='center'>
            <h1 className='test'>{spotDetails[spotId - 1].name}</h1>
            <p>{spotDetails[spotId - 1].address}, {spotDetails[spotId - 1].city}, {spotDetails[spotId - 1].state}, {spotDetails[spotId - 1].country}</p>
            <img
            src={`${spotDetails[spotId - 1].previewImage}`}
            alt=''/>
            <p>Average Rating: {spotDetails[spotId - 1].avgRating} stars</p>
            <p>Price: ${spotDetails[spotId - 1].price}</p>
            <p>Latitude: {spotDetails[spotId - 1].lat}</p>
            <p>Longitude: {spotDetails[spotId - 1].lng}</p>
        </div>
    )
}

export default SpotsDetails
