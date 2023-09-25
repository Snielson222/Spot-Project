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
    const [price, setPrice] = useState(0)
    const [previewImg, setPreviewImg] = useState("")
    const [img, setImg] = useState("")
    const [img1, setImg1] = useState("")
    const [img2, setImg2] = useState("")
    const [img3, setImg3] = useState("")
    const [errors, setErrors] = useState("")

return (<div>
    Create a Spot!
</div>)
}

export default CreateSpot;