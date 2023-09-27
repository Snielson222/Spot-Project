import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllSpots } from '../store/Spots.js';
import "./SpotsIndex.css"

const SpotsIndex = () => {
  const dispatch = useDispatch()
  const spots = []; // populate from Redux store
  const data = useSelector((state) => {
      return state.spots
  })
 
  

  Object.values(data).forEach((spot) => {
      return spots.push(spot)
  })
  
  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch])

 
  return (
    <section>
      <ul className='ulSpotsContainer'>
        {spots.map((spot) => (
          <div
            spot={spot}
            key={spot.spotId}
            className='spotsContainer'
          >
            <Link className='notLink' exact to={`/spots/${spot.id}`}>

            <img className="spotImg" src={spot.previewImage}></img>
            <div className='spotDataContainer'>
                <div className='cityStateRatingContainer'>
            <div className='notLink'>{spot.city}, {spot.state}</div>
            <div className='notLink'>★{spot.avgRating == null ? 'New' : spot.avgRating}</div>
                </div>
            <div className='notLink'>${spot.price} night</div>
            </div>
            </Link>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default SpotsIndex;