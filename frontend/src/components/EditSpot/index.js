import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
// import { Redirect, useHistory } from "react-router-dom";
import './EditSpot.css'
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal'


function EditSpotButton() {
  // const history = useHistory()
  const dispatch = useDispatch();
  const { spotId } = useParams()

  const currSpot = useSelector(state => state.spots.spot[spotId])
  console.log("currSpot", currSpot)

  let editValOne;
  let editValTwo;
  let editValThree;
  let editValFour;
  let editValFive;
  let editValSix;
  let editValSeven;
  let editValEight;
  let editValNine;

  const editValOneSet = currSpot ? editValOne = currSpot.name : ""
  const editValTwoSet = currSpot ? editValTwo = currSpot.description : ""
  const editValThreeSet = currSpot ? editValThree = currSpot.address : ""
  const editValFourSet = currSpot ? editValFour = currSpot.city : ""
  const editValFiveSet = currSpot ? editValFive = currSpot.country : ""
  const editValSixSet = currSpot ? editValSix = currSpot.state : ""
  const editValSevenSet = currSpot ? editValSeven = currSpot.lat : ""
  const editValEightSet = currSpot ? editValEight = currSpot.lng : ""
  const editValNineSet = currSpot ? editValNine = currSpot.price : ""

  const [name, setName] = useState(editValOne ? editValOne : "")
  const [description, setDescription] = useState(editValOne ? editValOne : "")
  const [address, setAddress] = useState(editValOne ? editValOne : "")
  const [city, setCity] = useState(editValOne ? editValOne : "")
  const [country, setCountry] = useState(editValOne ? editValOne : "")
  const [state, setState] = useState(editValOne ? editValOne : "")
  const [lat, setLat] = useState(editValOne ? editValOne : "")
  const [lng, setLng] = useState(editValOne ? editValOne : "")
  const [price, setPrice] = useState(editValOne ? editValOne : "")
  const [url, setUrl] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const editCurrentSpot = async (e) => {
    e.preventDefault();

    const editedSpot = {
      name, description, address, city, country, state, lat, lng, price, url
    }

    await dispatch(spotActions.editSpot(spotId, editedSpot))


    await dispatch(spotActions.getSpotById(spotId))
    setShowForm(false)

  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setUrl(file);
  };

  return (
    <>
      {
        showForm ? <Modal>
          <form onSubmit={editCurrentSpot} className="editspot-form">
            <input
              className="create-spot-input"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />


            <input
              className="create-spot-input"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required />

            <input
              className="create-spot-input"
              placeholder="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required />

            <input
              className="create-spot-input"
              placeholder="State"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required />

            <input
              className="create-spot-input"
              placeholder="Country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required />

            <input
              className="create-spot-input"
              placeholder="Latitude"
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required />

            <input
              className="create-spot-input"
              placeholder="Longitude"
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required />

            <input
              className="create-spot-input"
              placeholder="Price Per Night"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required />

            <input
              type="file"
              onChange={updateFile}
              // required
            />
            <div>(This will change the image located on the details page only.)</div>
            {/* <div> */}
            {/* <input
            type="checkbox"
            value={preview}
            onClick={(e) => setPreview(!preview)}
            /> */}
            {/* make this image preview image?</div> */}
            {/* Click here to upload an image.
            </label> */}

            <textarea
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required />
            <button type="submit" className="creatlocation-button">Confirm Edit</button>
            <button onClick={() => setShowForm(false)} className="creatlocation-button">Close</button>
          </form> </Modal> : (<button onClick={() => setShowForm(true)} className='editlocation-button'> Edit Location</button>
        )}
    </>
  )
}

export default EditSpotButton
