import './CreateSpot.css'
import { thunkCreateSpot, thunkCreateSpotImage } from '../store/Spots';
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
    const [name, setName] = useState("")
    const [price, setPrice] = useState()
    const [previewImg, setPreviewImg] = useState("")
    const [img, setImg] = useState("")
    const [img1, setImg1] = useState("")
    const [img2, setImg2] = useState("")
    const [img3, setImg3] = useState("")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    // useEffect(() => {
    //     const errorsObj = {}
       

    //     if (submitted) {
        
    //         if (!state.length) errorsObj.state = "State is required"
    //         if (!country.length) errorsObj.country = "Country is required"
    //         if (!address.length) errorsObj.address = "Address is required"
    //         if (!city.length) errorsObj.city = "City is required"
    //         if (description.length < 30) errorsObj.description = "Description needs a minimum of 30 characters"
    //         if (!name.length) errorsObj.name = "name is required"
    //         if (!price) errorsObj.price = "Price is required"
    //         if (!previewImg.includes(".png")) errorsObj.setPreviewImg = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!previewImg.includes(".jpg")) errorsObj.setPreviewImg = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!previewImg.includes(".jpeg")) errorsObj.setPreviewImg = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img.includes(".png")) errorsObj.img = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img.includes(".jpg")) errorsObj.img = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img.includes(".jpeg")) errorsObj.img = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img1.includes(".png")) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img1.includes(".jpg")) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img1.includes(".jpeg")) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img2.includes(".png")) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img2.includes(".jpg")) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img2.includes(".jpeg")) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img3.includes(".png")) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img3.includes(".jpg")) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg"
    //         if (!img3.includes(".jpeg")) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg"
        
    //     }
    //     setErrors(errorsObj)
        
    // }, [state, country, address, city, description, name, price, previewImg, img, img1, img2, img3, submitted])
    
    function setFormErrors(errorsObj = {}) {
        if (!state.length) errorsObj.state = "State is required"
        if (!country.length) errorsObj.country = "Country is required"
        if (!address.length) errorsObj.address = "Address is required"
        if (!city.length) errorsObj.city = "City is required"
        if (description.length < 30) errorsObj.description = "Description needs a minimum of 30 characters"
        if (!name.length) errorsObj.name = "name is required"
        if (!price) errorsObj.price = "Price is required"
        if (!previewImg.includes(".png") && !previewImg.includes(".jpg") && !previewImg.includes(".jpeg") && !previewImg.length) errorsObj.setPreviewImg = "Image URL must end in .png, .jpg, or .jpeg"
        // if (!img.includes(".png") || !img.includes(".jpg") || !img.includes(".jpeg")) errorsObj.img = "Image URL must end in .png, .jpg, or .jpeg"
        // if (!img1.includes(".png") || !img1.includes(".jpg") || !img1.includes(".jpeg")) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg"
        // if (!img2.includes(".png") || !img2.includes(".jpg") || !img2.includes(".jpeg")) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg"
        // if (!img3.includes(".png") || !img3.includes(".jpg") || !img3.includes(".jpeg")) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg"
    
    
    setErrors(errorsObj)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const lat = 1;
        const lng = 1;
        const spot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            lat,
            lng
        }
        
         
        
        if (Object.values(errors).length === 0) { 

            const res = await dispatch(thunkCreateSpot(spot))
            
            
            if (previewImg.length) {
                const imgRes = await dispatch(thunkCreateSpotImage({url: previewImg, preview: true}, res.id))
            }
            if (img.length) {
                const imgRes = await dispatch(thunkCreateSpotImage({url: img, preview: false}, res.id))
            } 
            if (img1.length) {
                const imgRes = await dispatch(thunkCreateSpotImage({url: img1, preview: false}, res.id))
            } 
            if (img2.length) {
                const imgRes = await dispatch(thunkCreateSpotImage({url: img2, preview: false}, res.id))
            } 
            if (img3.length) {
                const imgRes = await dispatch(thunkCreateSpotImage({url: img3, preview: false}, res.id))
            } 
            if (!res.errors) {
                history.push(`/spots/${res.id}`)
            } 
            else {
                setErrors(res.errors)
            }
            
        }
    }

return (<div className='formContainer'>
    {/* <p>{Object.values(errors)}</p> */}
    <div className='textContainer'>
        <h2>Create a new Spot</h2>
        <h3>Where's your place located?</h3>
        <div>Guests will only get your exact address once they booked a reservation.</div>
    </div>
    <form onSubmit={onSubmit}>
        <div className='countryContainer'>
        <label>
            Country
            </label>
            <input
            type='textarea'
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder='Country'>
            </input>
        <p>{errors.country}</p>
        </div>
        <div className='addressContainer'>
        <label>
            Street Address
            </label>
            <input
            type='text'
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder='Address'>
            </input>
        <p>{errors.address}</p>
        </div>
    <span className='cityStateContainer'>
        <div className='cityContainer'>
        <label>
            City
            </label>
            <input
            className='cityInput'
            type='text'
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder='City'>
            </input>
        <p>{errors.city}</p>
        </div>
       
        <div className='stateContainer'>
        <label>
            State
            </label>
            <input
            className='stateInput'
            type='text'
            value={state}
            onChange={e => setState(e.target.value)}
            placeholder='STATE'>
            </input>
        <p>{errors.state}</p>
        </div>
    </span>
    <div className='descriptionContainer'>
            <h2>Describe your place to guests</h2>
        <label>
        Mention the best features of your space, any special amenities like
fast wif or parking, and what you love about the neighborhood.
</label>
<br></br>
            <textarea
            
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
            className="descriptionForm"
            >
            </textarea>
        <p>{errors.description}</p>
        </div>
        <div className='nameContainer'>
            <h2>Create a title for your spot</h2>
        <label>
            Catch guests' attention with a spot title that highlights what makes your place special
            </label>
            <br></br>
            <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Name of your spot'>
            </input>
        <p>{errors.name}</p>
        </div>
        <div className='priceContainer'>
            <h2>Set a base price for your spot</h2>
            <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
        <br></br>
        <label>
            $
            <input
            type='number'
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder='Price per night (USD)'
            className='priceInput'>
            </input>
                </label>
        <p>{errors.price}</p>
        </div>
        <div className='imageContainer'>
            <h2>Liven up your spot with photos</h2>
        <label>
            Submit a link to at least one photo to publish your spot.
            </label>
            <br></br>
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
        </div>
        <div className='createButtonContainer'>

            <button className='submitButton' 
            type='submit' 
            // disabled={!state.length || !country.length || !address.length}
            onClick={() => setFormErrors()}>Create Spot</button>
        </div>
    </form>
</div>)
}

export default CreateSpot;