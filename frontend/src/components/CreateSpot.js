import './CreateSpot.css'
import { thunkCreateSpot } from '../store/Spots';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const CreateSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState()
    const [previewImg, setPreviewImg] = useState("")
    const [img, setImg] = useState("")
    const [img1, setImg1] = useState("")
    const [img2, setImg2] = useState("")
    const [img3, setImg3] = useState("")
    
    function onSubmit() {

    }

return (<div className='formContainer'>
    <div className='textContainer'>
        <h2>Create a new Spot</h2>
        <h3>Where's your place located?</h3>
        <div>Guests will only get your exact address once they booked a reservation.</div>
    </div>
    <form onSubmit={onSubmit}>
        <div className='countryContainer'>
        <label>
            Country
            <input
            type='text'
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder='Country'>
            </input>
        </label>
        </div>
        <div className='addressContainer'>
        <label>
            Street Address
            <input
            type='text'
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder='Address'>
            </input>
        </label>
        </div>
    <span className='cityStateContainer'>
        <div className='cityContainer'>
        <label>
            City
            <input
            type='text'
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder='City'>
            </input>
        </label>
        </div>
        <div className='stateContainer'>
        <label>
            State
            <input
            type='text'
            value={state}
            onChange={e => setState(e.target.value)}
            placeholder='STATE'>
            </input>
        </label>
        </div>
    </span>
    <div className='descriptionContainer'>
            <h2>Describe your place to guests</h2>
        <label>
        Mention the best features of your space, any special amenities like
fast wif or parking, and what you love about the neighborhood.
            <input
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Please write at least 30 characters'>
            </input>
        </label>
        </div>
        <div className='titleContainer'>
            <h2>Create a title for your spot</h2>
        <label>
            Catch guests' attention with a spot title that highlights what makes your place special
            <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Name of your spot'>
            </input>
        </label>
        </div>
        <div className='priceContainer'>
            <h2>Set a base price for your spot</h2>
            <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
        <label>
            $
            <input
            type='number'
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder='Price per night (USD)'>
            </input>
        </label>
        </div>
        <div className='imageContainer'>
            <h2>Liven up your spot with photos</h2>
        <label>
            Submit a link to at least one photo to publish your spot.
            <input
            type='url'
            value={previewImg}
            onChange={e => setPreviewImg(e.target.value)}
            placeholder='Preview Image URL'>
            </input>
            <input
            type='url'
            value={img}
            onChange={e => setImg(e.target.value)}
            placeholder='Image URL'>
            </input>
            <input
            type='url'
            value={img1}
            onChange={e => setImg1(e.target.value)}
            placeholder='Image URL'>
            </input>
            <input
            type='url'
            value={img2}
            onChange={e => setImg2(e.target.value)}
            placeholder='Image URL'>
            </input>
            <input
            type='url'
            value={img3}
            onChange={e => setImg3(e.target.value)}
            placeholder='Image URL'>
            </input>
        </label>
        </div>
            <button className='submitButton' type='submit'>Create Spot</button>
    </form>
</div>)
}

export default CreateSpot;