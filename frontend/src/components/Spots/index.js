import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';

const Spots = () => {
    const dispatch = useDispatch()

    const aSpot = useSelector(state => {
        return state.spots
    })

    console.log("THIS IS USE SELECTOR SPOT", aSpot)

    useEffect(() => {
        dispatch(getAllSpots())
      }, [dispatch])


    return (
        <div>
            {/* {abcArr} */}
            {/* <h1>The spot names are {aSpot.map((obj) => {
                return (
                    <div>{obj.name}</div>
                )
            })}</h1> */}
        </div>
    )
}

export default Spots
