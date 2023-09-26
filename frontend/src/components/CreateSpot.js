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
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const errorsObj = {}
        if (!state.length) errorsObj.state = "State is required"
        if (!country.length) errorsObj.country = "Country is required"
        if (!address.length) errorsObj.address = "Address is required"
        if (!city.length) errorsObj.city = "City is required"
        if (description.length < 30) errorsObj.description = "Description needs a minimum of 30 characters"
        if (!title.length) errorsObj.title = "name is required"
        if (!price) errorsObj.price = "Price is required"
        if (!previewImg.includes(".png")) errorsObj.setPreviewImg = "Image URL must end in .png, .jpg, or .jpeg"
        if (!previewImg.includes(".jpg")) errorsObj.setPreviewImg = "Image URL must end in .png, .jpg, or .jpeg"
        if (!previewImg.includes(".jpeg")) errorsObj.setPreviewImg = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img.includes(".png")) errorsObj.img = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img.includes(".jpg")) errorsObj.img = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img.includes(".jpeg")) errorsObj.img = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img1.includes(".png")) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img1.includes(".jpg")) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img1.includes(".jpeg")) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img2.includes(".png")) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img2.includes(".jpg")) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img2.includes(".jpeg")) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img3.includes(".png")) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img3.includes(".jpg")) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!img3.includes(".jpeg")) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg"

        setErrors(errorsObj)

    }, [state, country, address, city, description, title, price, previewImg, img, img1, img2, img3])
    
    const onSubmit = async (e) => {
        e.preventDefault()
        const spot = {
            country,
            address,
            city,
            state,
            description,
            title,
            price,
            previewImg,
            img,
            img1,
            img2,
            img3,
        }
        console.log("🚀 ~ file: CreateSpot.js:40 ~ onSubmit ~ spot:", spot)
        
        // const res = await dispatch(thunkCreateSpot(spot))
        // if (!res.errors) {
        //     history.push(`/spots/${res.id}`)
        // } else {
        //     setErrors(res.errors)
        // }

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
        <p>{errors.country}</p>
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
        <p>{errors.address}</p>
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
        <p>{errors.city}</p>
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
        <p>{errors.state}</p>
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
        <p>{errors.description}</p>
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
        <p>{errors.title}</p>
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
        <p>{errors.price}</p>
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
            <p>{errors.previewImg}</p>
            <input
            type='url'
            value={img}
            onChange={e => setImg(e.target.value)}
            placeholder='Image URL'>
            </input>
            <p>{errors.img}</p>
            <input
            type='url'
            value={img1}
            onChange={e => setImg1(e.target.value)}
            placeholder='Image URL'>
            </input>
            <p>{errors.img1}</p>
            <input
            type='url'
            value={img2}
            onChange={e => setImg2(e.target.value)}
            placeholder='Image URL'>
            </input>
            <p>{errors.img2}</p>
            <input
            type='url'
            value={img3}
            onChange={e => setImg3(e.target.value)}
            placeholder='Image URL'>
            </input>
            <p>{errors.img3}</p>
        </label>
        </div>
            <button className='submitButton' type='submit'>Create Spot</button>
    </form>
</div>)
}

export default CreateSpot;