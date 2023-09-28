import './CreateReview.css'
import { useState } from 'react';
import { thunkCreateReview } from '../store/Reviews';
import { useDispatch } from 'react-redux';
import { useModal } from '../context/Modal';

export const CreateReview = ({spotId}) => {
    console.log("🚀 ~ file: CreateReview.js:8 ~ CreateReview ~ spotId:", spotId)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [rating, setRating] = useState(0);
  console.log("🚀 ~ file: SpotsShow.js:16 ~ SpotsShow ~ rating:", rating);
  const [reviewText, setReviewText] = useState("");
  console.log(
    "🚀 ~ file: SpotsShow.js:17 ~ SpotsShow ~ reviewText:",
    reviewText
  );
  const [hoverRating, setHoverRating] = useState(0);
  console.log(
    "🚀 ~ file: SpotsShow.js:18 ~ SpotsShow ~ hoverRating:",
    hoverRating
  );

  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();

    const reviewForm = {
      review: reviewText,
      stars: rating,
    };
    console.log(
      "🚀 ~ file: SpotsShow.js:38 ~ onSubmit ~ reviewForm :",
      reviewForm
    );
    const res = dispatch(thunkCreateReview(reviewForm, spotId))
      .then(closeModal())
      .catch(errors);
    if (!res.errors) {
      closeModal();
    } else {
      setErrors(res.errors);
      console.log(
        "🚀 ~ file: SpotsShow.js:56 ~ onSubmit ~ res.errors:",
        res.errors
      );
    }
  }

return (<div className="postReviewModal">
<h1>How was your stay?</h1>
<p>{errors.review}</p>
<p>{errors.stars}</p>
<form onSubmit={onSubmit}>
  <label>
    <input
      className="postReviewModalTextbox"
      type="text"
      value={reviewText}
      placeholder="Just a quick review."
      onChange={(e) => setReviewText(e.target.value)}
    ></input>
  </label>
  <div className="rating">
    <div
      onMouseEnter={() => setHoverRating(1)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(1)}
      className={hoverRating >= 1 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(2)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(2)}
      className={hoverRating >= 2 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(3)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(3)}
      className={hoverRating >= 3 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(4)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(4)}
      className={hoverRating >= 4 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
    <div
      onMouseEnter={() => setHoverRating(5)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => setRating(5)}
      className={hoverRating >= 5 ? "full" : "empty"}
    >
      <i className="fa fa-star"></i>
    </div>
  </div>
  <button className="postReviewModalSubmit" type="submit">
    Submit Your Review
  </button>
</form>
</div>)
}

export default CreateReview;