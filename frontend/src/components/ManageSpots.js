import './ManageSpots.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { thunkGetCurrentSpots, thunkDeleteSpot } from '../store/Spots.js';
import OpenModalButton from './OpenModalButton/index'
import { useModal } from '../context/Modal';


export const ManageSpots = () => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const spots = [];
    
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
      <div className='manageSpotsHeader'>
        <h1>Manage Spots</h1>
        
      <Link className='createSpotButton' exact to="/spots/new"><button className='createSpotBut' >Create a New Spot</button></Link>
      </div>
      <ul className='ulSpotsContainer'>
        {spots.map((spot) => (
          <div
            spot={spot}
            key={spot.id}
            className='spotsContainer'
          >
            <Link className="manageLinks" exact to={`/spots/${spot.id}`}>

            <img className="spotImg" alt="SpotImage" src={spot.previewImage}></img>
            <div className='spotDataContainer'>
                <div className='cityStateRatingContainer'>
            <div className='manageLinks'>{spot.city}, {spot.state}</div>
            <div>★{spot.avgRating === 0 ? "New" : spot.avgRating}</div>
                </div>
            <div>${spot.price} night</div>
            </div>
            </Link>
            <div className='updateDeleteLinks'>
            <Link exact to={`/spots/${spot.id}/edit`}><button className='updateLink'>Update</button></Link>
            <div className="modalDelete" >
             <OpenModalButton
             
      buttonText="Delete"
      modalComponent={
        <div className='modalComponent'>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to remove this spot
from the listings?</h3>
      <button className='deleteInModal' onClick={() => dispatch(thunkDeleteSpot(spot.id)).then(closeModal())}>Yes (Delete Spot)</button>
    <button className='closeInModal' onClick={() => closeModal()}>No (keep spot)</button>
    </div>
    }
    />
    </div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
}

export default ManageSpots;