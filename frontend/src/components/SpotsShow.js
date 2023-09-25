import './SpotsShow.css'
import { useParams } from 'react-router-dom';
import { thunkDisplaySpotDetails } from '../store/Spots';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const SpotsShow = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    console.log("🚀 ~ file: SpotsShow.js:8 ~ SpotsShow ~ spotId:", spotId)

    const data = useSelector((state) => state.spots[spotId])
    console.log("🚀 ~ file: SpotsShow.js:11 ~ SpotsShow ~ data:", data)

    useEffect(() => {
        dispatch(thunkDisplaySpotDetails(spotId))
    }, [dispatch])
    return(<div>
        this is spotsshow
    </div>)
}

export default SpotsShow;