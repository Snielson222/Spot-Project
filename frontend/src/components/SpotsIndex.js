import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllSpots } from '../store/Spots.js';
import Icons from './Navigation/icons.js';
import SearchNav from './Navigation/search.js';
import "./SpotsIndex.css";

const SpotsIndex = () => {
  const dispatch = useDispatch();
  const [filteredSpots, setFilteredSpots] = useState([]);
  const spots = useSelector((state) => Object.values(state.spots));
  
  useEffect(() => {
    dispatch(thunkGetAllSpots());
  }, [dispatch]);

  const filterSpotsByDescription = (description) => {
    const filtered = spots.filter(spot => spot.description.toLowerCase().includes(description.toLowerCase()));
    setFilteredSpots(filtered);
  };

  return (
    <section>
      <SearchNav />
      <Icons filterSpotsByDescription={filterSpotsByDescription} />
      <div className='ulSpotsContainer'>
        {(filteredSpots.length > 0 ? filteredSpots : spots).map((spot) => (
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
