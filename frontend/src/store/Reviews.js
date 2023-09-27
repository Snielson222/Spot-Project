import {csrfFetch} from './csrf'

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';

export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

export const loadReviews = (review) => ({
    type: LOAD_REVIEWS,
    review
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

export const thunkLoadReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    const data = await res.json()
    dispatch(loadReviews(data))
    return data
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE"
    })
  
    if (res.status >= 400) {
      const error = await res.json()
      return error
    } else {
      const data = await res.json()
      dispatch(deleteReview(reviewId))
      return data
    }
}

export const thunkCreateReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(review)
    })
    
    if (!res.ok) {
      const error = await res.json()
      return error
    } else {
      const data = await res.json()
      dispatch(loadReviews(data))
      return data
    }
  }

  const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_REVIEWS:
        const reviewState = {};
        action.review.Reviews.forEach((review) => {
          reviewState[review.id] = review;
        });
        return reviewState;
        case DELETE_REVIEW:
          const newState = { ...state };
          delete newState[action.id];
          return newState;
        default:
        return state;
    }
  };
  
  export default reviewsReducer;