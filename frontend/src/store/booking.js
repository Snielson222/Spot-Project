import { csrfFetch } from "./csrf";

export const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";

export const CREATE_BOOKING = "bookings/CREATE_BOOKING";

export const DELETE_BOOKING = "bookings/DELETE_BOOKING";

export const EDIT_BOOKING = "bookings/EDIT_BOOKING";

export const LOAD_ONE_BOOKING = "bookings/LOAD_ONE_BOOKING";

export const loadBookings = (booking) => ({
  type: LOAD_BOOKINGS,
  booking,
});

export const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

export const deleteBooking = (booking) => ({
  type: DELETE_BOOKING,
  booking,
});

export const editBooking = (booking) => ({
  type: EDIT_BOOKING,
  booking,
});

export const loadOneBooking = (booking) => ({
  type: LOAD_ONE_BOOKING,
  booking,
});

export const thunkLoadBookings = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/bookings/current`);
  const data = await res.json();
  dispatch(loadBookings(data));
  return data;
};

export const thunkDeleteBooking = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (res.status >= 400) {
    const error = await res.json();
    return error;
  } else {
    const data = await res.json();
    dispatch(deleteBooking(data)); // Pass the entire booking object
    return data;
  }
};

export const thunkCreateBooking = (booking, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (!res.ok) {
    const error = await res.json();
    return error;
  } else {
    const data = await res.json();
    dispatch(thunkLoadBookings(spotId));
    return data;
  }
};

export const thunkEditBooking = (booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${booking.spot.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!res.ok) {
    const error = await res.json();
    return error;
  } else {
    const data = await res.json();
    dispatch(editBooking(data));
    return data;
  }
};

export const thunkLoadOneBooking = (bookingId) => async (dispatch) => {
  const res = await fetch(`/api/bookings/${bookingId}`);
  if (!res.ok) {
    const error = await res.json();
    return error;
  } else {
    const data = await res.json();
    dispatch(loadOneBooking(data));
    return data;
  }
};

const bookingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_BOOKINGS:
      const bookingState = {};
      action.booking.Bookings.forEach((booking) => {
        bookingState[booking.id] = booking;
      });
      return bookingState;
    case DELETE_BOOKING:
      newState = { ...state };
      delete newState[action.booking.id];
      return newState;
    case EDIT_BOOKING:
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
      case LOAD_ONE_BOOKING:
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
