
import { useState } from 'react';
import { thunkCreateReview} from '../store/Reviews';
import { thunkDisplaySpotDetails} from '../store/Spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../context/Modal';
import './CreateReview.css'

export const CreateReview = ({spotId}) => {
    
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [rating, setRating] = useState(0);

  const [reviewText, setReviewText] = useState("");
  
  const [hoverRating, setHoverRating] = useState(0);
  

  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();

    const reviewForm = {
      review: reviewText,
      stars: rating,
    };
    
    dispatch(thunkCreateReview(reviewForm, spotId))
    .then(() => dispatch(thunkDisplaySpotDetails(spotId)))
    .then(closeModal())
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.message);
        }
      });

  }

  function disableFunc() {
    if (reviewText.length < 10 || rating === 0) return true
    return false
  }

return (<div className="postReviewModal">
<h1>How was your stay?</h1>
<p>{Object.values(errors)}</p>
<form onSubmit={onSubmit}>
  <label>
    <textarea
      className="postReviewModalTextbox"
      type="text"
      value={reviewText}
      placeholder="Leave your review here..."
      onChange={(e) => setReviewText(e.target.value)}
    ></textarea>
  </label>
  <div className="rating">
    <div
      onMouseEnter={() => setHoverRating(1)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(1)}
      className={hoverRating >= 1 || rating >= 1? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(2)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(2)}
      className={hoverRating >= 2 || rating >= 2 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(3)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(3)}
      className={hoverRating >= 3 || rating >= 3? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(4)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(4)}
      className={hoverRating >= 4 || rating >= 4 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(5)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(5)}
      className={hoverRating >= 5 || rating >= 5 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div> Stars</div>
  </div>
  <button className="postReviewModalSubmit" type="submit" disabled={disableFunc()}>
    Submit Your Review
  </button>
</form>
</div>)
}

export default CreateReview;