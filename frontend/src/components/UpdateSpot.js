import './UpdateSpot.css'
import { thunkEditSpot, thunkDisplaySpotDetails} from '../store/Spots';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';

export const UpdateSpot = () => {
    const params = useParams()
    const spotId = params.id
    console.log("🚀 ~ file: UpdateSpot.js:9 ~ UpdateSpot ~ spotId:", spotId)

    const spot = useSelector((state) => state.spots[spotId])
    const data = {...spot}
    console.log("🚀 ~ file: UpdateSpot.js:31 ~ UpdateSpot ~ data:", data)

    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(data.country)
    const [address, setAddress] = useState(data.address)
    const [city, setCity] = useState(data.city)
    const [state, setState] = useState(data.state)
    const [description, setDescription] = useState(data.description)
    const [name, setName] = useState(data.name)
    const [price, setPrice] = useState(data.price)

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

   useEffect(() => {
       dispatch(thunkDisplaySpotDetails(spotId))
    }, [dispatch, spotId])


    useEffect(() => {
        const errorsObj = {}
       
        if (submitted) {
        
            if (!state.length) errorsObj.state = "State is required"
            if (!country.length) errorsObj.country = "Country is required"
            if (!address.length) errorsObj.address = "Address is required"
            if (!city.length) errorsObj.city = "City is required"
            if (description.length < 30) errorsObj.description = "Description needs a minimum of 30 characters"
            if (!name.length) errorsObj.name = "name is required"
            if (!price) errorsObj.price = "Price is required"
            
        }

        setErrors(errorsObj)
        
    }, [state, country, address, city, description, name, price, submitted])

    const onSubmit = async (e) => {
        e.preventDefault()
        const lat = 1;
        const lng = 1;
        const spot = {
            id: Number(data.id),
            ownerId: Number(data.Owner.id),
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            lat,
            lng,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        console.log("🚀 ~ file: UpdateSpot.js:57 ~ onSubmit ~ spot:", spot)

        const res = await dispatch(thunkEditSpot(spot))
        if (!res.errors) {
            history.push(`/spots/${spotId}`)
        } else {
            setErrors(res.errors)
            console.log("🚀 ~ file: UpdateSpot.js:79 ~ onSubmit ~ res.errors:", res.errors)
        }

    }
return(<div className='formContainer'>
<div className='textContainer'>
    <h2>Update your Spot</h2>
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
    <div className='nameContainer'>
        <h2>Create a title for your spot</h2>
    <label>
        Catch guests' attention with a spot title that highlights what makes your place special
        <input
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Name of your spot'>
        </input>
    </label>
    <p>{errors.name}</p>
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
        <button className='submitButton' type='submit' onClick={() => setSubmitted(true)}>Create Spot</button>
</form>
</div>)
}

export default UpdateSpot;