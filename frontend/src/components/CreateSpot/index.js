import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots'
// import { Redirect, useHistory } from "react-router-dom";

function CreateSpotButton (){
    // const history = useHistory()
    const dispatch = useDispatch();

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
    const [preview, setPreview] = useState("")
    const [showForm, setShowForm] = useState(false)

    const createNewSpot = (e) => {
        e.preventDefault();

        const createdSpot = {
            name, description, address, city, country, state, lat, lng, price, url, preview
        }

        dispatch(spotActions.createSpot(createdSpot))

        dispatch(spotActions.getAllSpots())

      }

    return (
        <>
        {
            showForm ?
        <form onSubmit={createNewSpot}>
          <label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required/>
            Name
          </label>
          <label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required/>
            Description
          </label>
          <label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required/>
            Address
          </label>
          <label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required/>
            City
          </label>
          <label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required/>
            Country
          </label>
          <label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required/>
            State
          </label>
          <label>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required/>
            Lat
          </label>
          <label>
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required/>
            Lng
          </label>
          <label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required/>
            Price
          </label>
          <label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required/>
            Image Url
          </label>
        <label>
          <input
            type="text"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            required/>
            Preview Img
          </label>
          <button type="submit">Create location</button>
          <button onClick={() => setShowForm(false)}>Discard</button>
        </form> : (<button onClick={() => setShowForm(true)}> Become a Host</button>
        )}
        </>
      )
}

export default CreateSpotButton
