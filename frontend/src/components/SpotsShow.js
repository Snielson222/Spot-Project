import './SpotsShow.css'
import { useParams } from 'react-router-dom';
import { thunkDisplaySpotDetails } from '../store/Spots';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkLoadReviews, thunkCreateReview, thunkDeleteReview } from '../store/Reviews';
import OpenModalButton from './OpenModalButton';
import { useModal } from '../context/Modal';

const SpotsShow = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    console.log("🚀 ~ file: SpotsShow.js:17 ~ SpotsShow ~ reviewText:", reviewText)
    const [hoverRating, setHoverRating] = useState(0)
    console.log("🚀 ~ file: SpotsShow.js:18 ~ SpotsShow ~ hoverRating:", hoverRating)
    const [errors, setErrors] = useState({});

    useEffect(() => {
       dispatch(thunkDisplaySpotDetails(spotId))
       dispatch(thunkLoadReviews(spotId))
    }, [dispatch, spotId])

    const spot = useSelector((state) => state.spots[spotId])
    const data = {...spot}
    console.log("🚀 ~ file: SpotsShow.js:18 ~ SpotsShow ~ data:", data)
    
    // const review = useSelector((state) => state.reviews[spotId])

    const review1 = useSelector((state) => state.reviews)
    const reviewObj = {...review1}
    const reviewArray = Object.values(review1)
    console.log("🚀 ~ file: SpotsShow.js:32 ~ SpotsShow ~ reviewArray:", reviewArray)
   
    
    const session = useSelector((state) => state.session.user)
    console.log("🚀 ~ file: SpotsShow.js:39 ~ SpotsShow ~ session:", session)
   
   

    async function onSubmit(e) {
        e.preventDefault()

        const reviewForm = {
            review: reviewText,
            stars: rating
        }
        console.log("🚀 ~ file: SpotsShow.js:38 ~ onSubmit ~ reviewForm :", reviewForm )
        const res = dispatch(thunkCreateReview(reviewForm))
        if (!res.errors) {
            closeModal()
        } else {
            setErrors(res.errors)
        }
    }

    useEffect(() => {
        setHoverRating(rating)
      }, [hoverRating])

      function deleteReview() {
        
      }
    

    return(<div className='spotsShowContainer'>
        <h1>{data.name}</h1>
        <h3>{data.city}, {data.state}, {data.country}</h3>
        <div className='imgContainer'>
            {data.SpotImages?.map((img) => (
               <span key={img.id}><img alt="spotImg" className={`img${img.preview}`} src={img.url}></img></span>
            ))}
        </div>
        <span className='textContainer'>
        <div className='nameDescriptionContainer'>
            <div>Hosted by {data.Owner?.firstName} {data?.Owner?.lastName}</div>
            <br></br>
            <div>{data?.description}</div>
        </div>
        <div className='reviewAndButtonContainer'>
            <div className='priceReviewContainer'>
                <div>${data?.price} night</div>
                <div>★{data?.numReviews <= 0 ? "New" : data?.avgStarRating} {data?.numReviews <= 0 ? "" : "·"} {data?.numReviews <= 0 ? "" : data?.numReviews} 
                {data?.numReviews === 0 ? "" : ""} {data?.numReviews === 1 ? "review" : ""} {data?.numReviews > 1 ? "reviews" : ""}</div>
            </div>
            <button className='reserveButton' onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
        </div>
        </span>
        <div>★{data?.numReviews <= 0 ? "New" : data?.avgStarRating} {data?.numReviews <= 0 ? "" : "·"} {data?.numReviews <= 0 ? "" : data?.numReviews} 
        {data?.numReviews === 0 ? "" : ""} {data?.numReviews === 1 ? "review" : ""} {data?.numReviews > 1 ? "reviews" : ""}</div>
        <OpenModalButton
             
      buttonText="Post Your Review"
      modalComponent={
        <div className='postReviewModal'>
        <h1>How was your stay?</h1>
        <p>{errors.message}</p>
        <form onSubmit={onSubmit}>
            <label>
        <input 
        className="postReviewModalTextbox" 
        type='text' 
        value={reviewText}
        placeholder='Just a quick review.'
        onChange={e => setReviewText(e.target.value)}
        >
        </input>
            </label>
        <div className='rating'>
            <div onMouseEnter={() => setHoverRating(1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(1)}
            className={hoverRating >= 1 ? "full" : "empty"}>
                <i className="fa fa-star"></i>
            </div>
            <div onMouseEnter={() => setHoverRating(2)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(2)}
            className={hoverRating >= 2 ? "full" : "empty"}>
                <i className="fa fa-star"></i>
            </div>
            <div onMouseEnter={() => setHoverRating(3)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(3)}
            className={hoverRating >= 3 ? "full" : "empty"}>
                <i className="fa fa-star"></i>
            </div>
            <div onMouseEnter={() => setHoverRating(4)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(4)}
            className={hoverRating >= 3 ? "full" : "empty"}>
                <i className="fa fa-star"></i>
            </div>
            <div onMouseEnter={() => setHoverRating(5)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(5)}
            className={hoverRating >= 5 ? "full" : "empty"}>
                <i className="fa fa-star"></i>
            </div>
        </div>
      <button className='postReviewModalSubmit' type="submit" >Submit Your Review</button>
      </form>
    </div>
    }
    />

    <div className='reviewContainer'>
        {reviewArray.map((review) => (
            <div key={review.id}>
                <h4>{review?.User.firstName}</h4>
                <div>{review?.createdAt.slice(0,7)}</div>
                <br></br>
                <div>{review?.review}</div>
                <br></br>
                <button hidden={review?.userId !== session.id}><OpenModalButton hidden={review?.userId !== session.id}
      buttonText="Delete Review"
      modalComponent={
        <div className='modalComponent'>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this review?</h3>
      <button className='deleteInModal' onClick={() => dispatch(thunkDeleteReview(review.id))}>Yes (Delete Review)</button>
    <button className='closeInModal' onClick={() => closeModal()}>No (Keep Review)</button>
    </div>
    }
    /></button>
            </div>
        ))}
    </div>
    </div>)
}

export default SpotsShow;