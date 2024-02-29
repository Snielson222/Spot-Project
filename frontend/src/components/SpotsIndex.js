import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllSpots } from '../store/Spots.js';
import Icons from './Navigation/icons.js';
import SearchNav from './Navigation/search.js';
import "./SpotsIndex.css"

const SpotsIndex = () => {
  const dispatch = useDispatch()
  const spots = [];
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
      <SearchNav />
      <Icons />
      <div className='ulSpotsContainer'>
        {spots.map((spot) => (
          <div
            spot={spot}
            key={spot.spotId}
            className='spotsContainer'
            title={`${spot.name}`}
          >
            <Link className='notLink' exact to={`/spots/${spot.id}`}>
            <img className="spotImg" alt="Spot" src={spot.previewImage}></img>
            <div className='spotDataContainer'>
                <div className='cityStateRatingContainer'>
            <div className='notLink'>{spot.city}, {spot.state}</div>
            <div className='notLink'>★{spot.avgRating == null ? 'New' : spot.avgRating}{spot?.avgRating?.length === 1 ? ".0" : ""}</div>
                </div>
            <div className='notLinkPrice'>${spot.price} night</div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpotsIndex;