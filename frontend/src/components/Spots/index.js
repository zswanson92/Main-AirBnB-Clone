import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
// import { loadAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './Spots.css'

const Spots = () => {
    const dispatch = useDispatch()

    const aSpotObj = useSelector(state => {
        // console.log("this is aSpotObj", state)
        return state.spots.allSpots
    })

    const aSpot = Object.values(aSpotObj)


    useEffect(() => {
        dispatch(getAllSpots())
      }, [dispatch])


    if(!aSpot.length){
        return null
    }

    return (
        <div className='homepage'>
             <h2>{aSpot.map((obj) => {
                return(
                <div className='inner-homepage'>
                <Link style={{textDecoration: 'none'}} to={`/spots/${obj.id}`}>
                <img
                    className="item-image"
                    alt={obj.previewImage}
                    src={`${obj.previewImage}`}/>
                <p className='topline-text'>{obj.name} ★{obj.avgRating} </p>
                {/* <p>{obj.avgRating} stars</p> */}
                <p className='bottomline-text'>${obj.price} / night</p>
                </Link>
                </div>
                )
            })}</h2>
        </div>
    )
}

export default Spots
