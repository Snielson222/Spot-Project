import './SpotsShow.css'
import { useParams } from 'react-router-dom';
import { thunkDisplaySpotDetails } from '../store/Spots';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const SpotsShow = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    console.log("🚀 ~ file: SpotsShow.js:8 ~ SpotsShow ~ spotId:", spotId)

    useEffect(() => {
       dispatch(thunkDisplaySpotDetails(spotId))
    }, [dispatch, spotId])

    const spot = useSelector((state) => state.spots[spotId])
    const data = {...spot}
    console.log("🚀 ~ file: SpotsShow.js:11 ~ SpotsShow ~ data:", data)
    console.log("🚀 ~ file: SpotsShow.js:23 ~ SpotsShow ~ data.SpotImages:", data.SpotImages)


    return(<div>
        <div className='imgContainer'>
            {data?.SpotImages?.map((img) => (
               <span key={img?.id}><img alt="spotImg" className="img" src={img?.url}></img></span>
            ))}
        </div>
        <span className='textContainer'>

        <div className='nameDescriptionContainer'>
            <div>Hosted by {data?.Owner?.firstName} {data?.Owner?.lastName}</div>
            <div>{data?.description}</div>
        </div>
        <div className='reviewAndButtonContainer'>
            <div className='priceReviewContainer'>
                <div>${data?.price} night</div>
                <div>★{data?.avgStarRating} #{data?.numReviews}</div>
            </div>
            <button className='reserveButton' onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
        </div>
        </span>
    </div>)
}

export default SpotsShow;