
export const LOAD_SPOTS= 'spots/LOAD_SPOTS';

export const CREATE_SPOT = 'spots/CREATE_SPOT';

export const UPDATE_SPOT = 'spots/UPDATE_SPOT';

export const REMOVE_SPOT = 'spots/REMOVE_SPOT';

export const LOAD_SPOT = 'spots/LOAD_SPOT';

export const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot,
  });

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const editSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});


export const thunkGetAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots")
  const data = await res.json()
  dispatch(loadSpots(data))
  return data
}

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })

  if (res.status >= 400) {
    const error = await res.json()
    return error
  } else {
    const data = await res.json()
    dispatch(removeSpot(spotId))
    return data
  }
}

export const thunkDisplaySpotDetails = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`)
  const data = await res.json()
  dispatch(loadSpot(data))
  return data
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
  const res = await fetch("/api/spots", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spot)
  })
  
  if (!res.ok) {
    const error = await res.json()
    return error
  } else {
    const data = await res.json()
    dispatch(loadSpot(data))
    return data
  }
}

export const thunkEditSpot = (spot) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spot.spotId}`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spot)
  })
  if (!res.ok) {
    const error = await res.json()
    return error
  } else {
    const data = await res.json()
    dispatch(editSpot(data))
    return data
  }
}

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    case LOAD_SPOT:
      return { ...state, [action.spots.spotId]: action.spot };
    case UPDATE_SPOT:
      return { ...state, [action.spots.spotId]: action.spot };
    case REMOVE_SPOT:
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;