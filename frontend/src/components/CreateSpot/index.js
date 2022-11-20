import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots'
// import { Redirect, useHistory } from "react-router-dom";
import './CreateSpot.css'
// import { Modal } from '../../context/Modal'


function CreateSpotButton (){
    // const history = useHistory()
    const dispatch = useDispatch();

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
    const [url, setUrl] = useState("")
    // const [preview, setPreview] = useState("")
    const [showForm, setShowForm] = useState(false)

    const createNewSpot = async (e) => {
        e.preventDefault();

        const createdSpot = {
            name, description, address, city, country, state, lat, lng, price, url, preview: true
        }

        await dispatch(spotActions.createSpot(createdSpot))

        await dispatch(spotActions.getAllSpots())

        // dispatch(spotActions.getAllSpots())

      }

    return (
        <>
        {
            showForm ?
        <form onSubmit={createNewSpot} className="newspot-form">
            <input
            className="location-name-input"
            placeholder="Location Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required/>

          <input
          className="address-input"
            placeholder="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required/>
          <input
          className="city-input"
            placeholder="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required/>
          <input
          className="state-input"
            placeholder="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required/>
          <input
          className="country-input"
            placeholder="Country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required/>
          <input
          className="latitude-input"
            placeholder="Latitude"
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required/>
          <input
          className="longitude-input"
            placeholder="Longitude"
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required/>
          <input
          className="price-input"
            placeholder="Price Per Night"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required/>
          <input
          className="url-input"
            placeholder="Preview Image Url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required/>

<textarea
          className="description-input"
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required/>
        {/* <label> */}
          {/* <input
            type="text"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            required/>
            Preview Img
          </label> */}
          <button type="submit" className="creatlocation-button">Create location</button>
          <button onClick={() => setShowForm(false)} className='discardlocation-button'>Close</button>
        </form> : (<button onClick={() => setShowForm(true)} className='host-button'> Become a Host</button>
        )}
        </>
      )
}

export default CreateSpotButton



// {
//   showForm ?
// <form onSubmit={createNewSpot} className="newspot-form">
//   <input
//   className="location-name-input"
//   placeholder="Location Name"
//   type="text"
//   value={name}
//   onChange={(e) => setName(e.target.value)}
//   required/>

// <input
// className="address-input"
//   placeholder="Address"
//   type="text"
//   value={address}
//   onChange={(e) => setAddress(e.target.value)}
//   required/>
// <input
// className="city-input"
//   placeholder="City"
//   type="text"
//   value={city}
//   onChange={(e) => setCity(e.target.value)}
//   required/>
// <input
// className="state-input"
//   placeholder="State"
//   type="text"
//   value={state}
//   onChange={(e) => setState(e.target.value)}
//   required/>
// <input
// className="country-input"
//   placeholder="Country"
//   type="text"
//   value={country}
//   onChange={(e) => setCountry(e.target.value)}
//   required/>
// <input
// className="latitude-input"
//   placeholder="Latitude"
//   type="text"
//   value={lat}
//   onChange={(e) => setLat(e.target.value)}
//   required/>
// <input
// className="longitude-input"
//   placeholder="Longitude"
//   type="text"
//   value={lng}
//   onChange={(e) => setLng(e.target.value)}
//   required/>
// <input
// className="price-input"
//   placeholder="Price Per Night"
//   type="text"
//   value={price}
//   onChange={(e) => setPrice(e.target.value)}
//   required/>
// <input
// className="url-input"
//   placeholder="Preview Image Url"
//   type="url"
//   value={url}
//   onChange={(e) => setUrl(e.target.value)}
//   required/>

// <textarea
// className="description-input"
//   placeholder="Description"
//   type="text"
//   value={description}
//   onChange={(e) => setDescription(e.target.value)}
//   required/>
// {/* <label> */}
// {/* <input
//   type="text"
//   value={preview}
//   onChange={(e) => setPreview(e.target.value)}
//   required/>
//   Preview Img
// </label> */}
// <button type="submit" className="creatlocation-button">Create location</button>
// <button onClick={() => setShowForm(false)} className='discardlocation-button'>Close</button>
// </form> : (<button onClick={() => setShowForm(true)} className='host-button'> Become a Host</button>
// )}
