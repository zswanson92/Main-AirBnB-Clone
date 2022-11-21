import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots'
// import { Redirect, useHistory } from "react-router-dom";
import './EditSpot.css'
import { useParams } from 'react-router-dom';
// import { Modal } from '../../context/Modal'


function EditSpotButton ({ user }){
    // const history = useHistory()
    const dispatch = useDispatch();
    const { spotId } = useParams()


    // const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [price, setPrice] = useState("")
    // const [url, setUrl] = useState("")
    // const [preview, setPreview] = useState("")
    const [showForm, setShowForm] = useState(false)
    // const [submit, setSubmit] = useState(true)

    const editCurrentSpot = async (e) => {
        e.preventDefault();

        const editedSpot = {
            name, description, address, city, country, state, lat, lng, price
        }

        // const aEditedSpot =
        await dispatch(spotActions.editSpot(spotId, editedSpot))

        // setSubmit(false)
        // if(aEditedSpot){
        await dispatch(spotActions.getSpotById(spotId))
        // }
        setShowForm(false)

        // return history.push(`/spots/${spotId}`)
      }


    return (
        <>
        {
            showForm ?
        <form onSubmit={editCurrentSpot} className="editspot-form">
            <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required/>
          <textarea
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required/>

          <input
            placeholder="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required/>

          <input
            placeholder="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required/>

          <input
            placeholder="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required/>

          <input
            placeholder="Country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required/>

          <input
            placeholder="Latitude"
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required/>

          <input
            placeholder="Longitude"
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required/>

          <input
            placeholder="Price Per Night"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required/>

          {/* <label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required/>
            Image Url
          </label> */}
        {/* <label> */}
          {/* <input
            type="text"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            required/>
            Preview Img
          </label> */}
          <button type="submit" className="confirmedit-button">Confirm Edit</button>
          <button onClick={() => setShowForm(false)} className='closeedit-button'>Close</button>
        </form> : (<button onClick={() => setShowForm(true)} className='editlocation-button'> Edit Location</button>
        )}
        </>
      )
}

export default EditSpotButton
