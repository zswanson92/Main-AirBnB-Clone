import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots'
// import { Redirect, useHistory } from "react-router-dom";
import './CreateSpot.css'
import { Modal } from '../../context/Modal'


function CreateSpotButton() {
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
  const [url, setUrl] = useState(null)
  // const [preview, setPreview] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState([])

  const createNewSpot = async (e) => {
    e.preventDefault();

    const createdSpot = {
      name, description, address, city, country, state, lat, lng, price, url, preview: true
    }

    await dispatch(spotActions.createSpot(createdSpot))

    await dispatch(spotActions.getAllSpots())

    setName("")
    setDescription("")
    setAddress("")
    setCity("")
    setCountry("")
    setState("")
    setLat("")
    setLng("")
    setPrice("")
    setUrl("")
    // dispatch(spotActions.getAllSpots())
    setShowForm(false)
  }

  useEffect(() => {
    let err = []
    if (name.length > 40) {
      err.push('Name is too long.')
    }
    if (lat.length > 0 && !isValidNum(lat)) {
      err.push('Latitude must be a number.')
    }
    if (lng.length > 0 && !isValidNum(lng)) {
      err.push('Longitude must be a number.')
    }
    if (price.length > 0 && !isValidNum(price)) {
      err.push('Price must be a number.')
    }
    if (description.length > 255) {
      err.push('Description is too long.')
    }

    setErrors(err)
  }, [name, lat, lng, price, description])




  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setUrl(file);
  };

  function isValidNum(num) {
    let regexp = /^[0-9]+$/;
    return regexp.test(num)
  }

  return (
    <>
      {
        showForm ? <Modal>
          <form onSubmit={createNewSpot} className="newspot-form">
            <label style={{ paddingTop: '.5em' }}>Create a AirZnB</label>
            <div>
              <input
                className="create-spot-input"
                placeholder="Location Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
              {name.length > 40 ? <div style={{ fontSize: '16px', marginLeft: '2em', color: 'red' }}>Name must be 40 characters or less.</div> : <div> &nbsp; </div>}
            </div>
            <div>
              <input
                className="create-spot-input"
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required />
              <div> &nbsp; </div>
            </div>
            <div>
              <input
                className="create-spot-input"
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required />
              <div> &nbsp; </div>
            </div>
            <div>
              <input
                className="create-spot-input"
                placeholder="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required />
              <div> &nbsp; </div>
            </div>
            <div>
              <input
                className="create-spot-input"
                placeholder="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required />
              <div> &nbsp; </div>
            </div>
            <div>
              <input
                className="create-spot-input"
                placeholder="Latitude"
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required />
              {lat.length > 0 && !isValidNum(lat) ? <div style={{ fontSize: '16px', marginLeft: '3.3em', color: 'red' }}>Latitude must be a number.</div> : <div> &nbsp; </div>}
            </div>
            <div>
              <input
                className="create-spot-input"
                placeholder="Longitude"
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required />
              {lng.length > 0 && !isValidNum(lng) ? <div style={{ fontSize: '16px', marginLeft: '3.3em', color: 'red' }}>Longitude must be a number.</div> : <div> &nbsp; </div>}

            </div>
            <div>
              <input
                className="create-spot-input"
                placeholder="Price Per Night"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required />
              {price.length > 0 && !isValidNum(price) ? <div style={{ fontSize: '16px', marginLeft: '4em', color: 'red' }}>Price must be a number.</div> : <div> &nbsp; </div>}
            </div>
            <input
              type="file"
              onChange={updateFile}
              required
            />
            {/* Click here to upload an image.
            </label> */}
            <div>
              <textarea
                className="description-input"
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required />
              {description.length > 255 ? <div style={{ fontSize: '15px', marginLeft: '.5em', color: 'red' }}>Description must be 255 characters or less.</div> : <div> &nbsp; </div>}
            </div>
            <button type="submit" className="creatlocation-button" disabled={errors.length > 0 ? true : false}>Create location</button>
            <button onClick={() => setShowForm(false)} className='discardlocation-button'>Close</button>
          </form> </Modal> : (<button onClick={() => setShowForm(true)} className='host-button'> Become a Host</button>)}
    </>
  )
}

export default CreateSpotButton

// : (<button onClick={() => setShowForm(true)} className='host-button'> Become a Host</button>)



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
