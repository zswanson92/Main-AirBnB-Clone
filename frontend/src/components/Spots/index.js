import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './Spots.css'
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
// import logotwo from '../../assets/githublogo.png'

const Spots = () => {
    const dispatch = useDispatch()

    const aSpotObj = useSelector(state => {
        return state.spots.allSpots
    })

    const aSpot = Object.values(aSpotObj)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    if (!aSpot.length) {
        return null
    }

    return (
        <>
            <div className='homepage'>
                {aSpot.map((obj) => {
                    return (
                        <div key={obj.id} className='inner-homepage'>
                            {console.log("!!!OBJ", obj)}
                            <Link style={{ textDecoration: 'none' }} to={`/spots/${obj.id}`}>
                                <img
                                    className="item-image"
                                    alt={obj.previewImage}
                                    src={`${obj.previewImage}`} />
                                <p className='topline-text'>{obj.name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <IconContext.Provider value={{ color: 'gold' }} >
                                    <FaStar />
                                </IconContext.Provider> &nbsp; {obj.avgRating} </p>
                                <p className='bottomline-text'>${obj.price} / night</p>
                            </Link>
                        </div>
                    )
                })}

            </div>
            <footer className='cred-footer'>
                <div className='foot-div'>© 2022 UltimateZnB Corp
                    <div className='foot-name-div'><a className='zack-anchor' href='https://github.com/zswanson92'>Zack Swanson</a></div>
                    <a href='https://github.com/zswanson92'> <img src='https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' alt='Logo' className='splash-logo-img'></img></a></div>
            </footer>
        </>
    )
}

export default Spots
