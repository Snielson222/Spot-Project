import './ManageSpots.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { thunkGetCurrentSpots } from '../store/Spots.js';


export const ManageSpots = () => {
    const dispatch = useDispatch()
    const spots = []; // populate from Redux store
    console.log("🚀 ~ file: ManageSpots.js:11 ~ ManageSpots ~ spots:", spots)
  const data = useSelector((state) => {
      return state.spots
  })

  Object.values(data).forEach((spot) => {
    return spots.push(spot)
})

useEffect(() => {
  dispatch(thunkGetCurrentSpots())
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
            <Link exact to={`/spots/${spot.id}`}>

            <img className="spotImg" src={spot.previewImage}></img>
            </Link>
            <div className='spotDataContainer'>
                <div className='cityStateRatingContainer'>
            <div>{spot.city}, {spot.state}</div>
            <div>★{spot.avgRating}</div>
                </div>
            <div>${spot.price} night</div>
            </div>
            <div className='updateDeleteLinks'>
            <Link exact to={`/spots/${spot.id}/edit`}><button className='updateLink'>Update</button></Link>
            <button className='deleteButton' onClick={""}>Delete</button>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
}

export default ManageSpots;