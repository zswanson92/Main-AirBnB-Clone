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
  // console.log("currSpot", currSpot)

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
  const [description, setDescription] = useState(editValTwo ? editValTwo : "")
  const [address, setAddress] = useState(editValThree ? editValThree : "")
  const [city, setCity] = useState(editValFour ? editValFour : "")
  const [country, setCountry] = useState(editValFive ? editValFive : "")
  const [state, setState] = useState(editValSix ? editValSix : "")
  const [lat, setLat] = useState(editValSeven ? editValSeven : "")
  const [lng, setLng] = useState(editValEight ? editValEight : "")
  const [price, setPrice] = useState(editValNine ? editValNine : "")
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

  function isValidNum(num) {
    let regexp = /^[0-9]+$/;
    return regexp.test(num)
  }

  return (
    <>
      {
        showForm ? <Modal>
          <form onSubmit={editCurrentSpot} className="editspot-form">
            <div>
              <input
                className="create-spot-input"
                placeholder="Name"
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
            <div>
              <textarea
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required />
              {description.length > 255 ? <div style={{ fontSize: '15px', marginLeft: '.5em', color: 'red' }}>Description must be 255 characters or less.</div> : <div> &nbsp; </div>}
            </div>
            <button type="submit" className="creatlocation-button">Confirm Edit</button>
            <button onClick={() => setShowForm(false)} className="creatlocation-button">Close</button>
          </form> </Modal> : (<button onClick={() => setShowForm(true)} className='editlocation-button'> Edit Location</button>
        )}
    </>
  )
}

export default EditSpotButton
