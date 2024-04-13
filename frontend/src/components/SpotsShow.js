import "./SpotsShow.css";
import { useParams, NavLink, useHistory} from "react-router-dom";
import { thunkDisplaySpotDetails } from "../store/Spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo} from "react";
import {
  thunkLoadReviews,
  thunkDeleteReview,
} from "../store/Reviews";
import OpenModalButton from "./OpenModalButton";
import { useModal } from "../context/Modal";
import CreateReview from "./CreateReview";

const SpotsShow = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const {push} = useHistory()
  


  
  useEffect(() => {
    dispatch(thunkDisplaySpotDetails(spotId));
    dispatch(thunkLoadReviews(spotId));
  }, [dispatch, spotId]);

  const spot = useSelector((state) => state.spots[spotId]);
  const data = { ...spot };


  const review1 = useSelector((state) => state.reviews);
  // sort by created at
  const reviewArray = useMemo(() => Object.values(review1).sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  }), [review1]);


  const session = useSelector((state) => state.session.user);


  const isReviewedByUser = reviewArray.filter(review => {
    console.log({review})
    return review.userId === session?.id
  }).length > 0

const isOwnedByUser = data?.ownerId === session?.id

const notLoggedIn = !session?.id

function hideReviewButton() {
  return isOwnedByUser || isReviewedByUser || notLoggedIn;
  // if (data?.ownerId === session?.id || reviewArray?.filter((review) => review.userId === session?.id)) return true

  // return false
}

  return (
    <div id="topBorder" className="spotsShowContainer">
      <h1 >{data.name}</h1>
      <h3>
        {data.city}, {data.state}, {data.country}
      </h3>
      <div className="bigImgContainer">
      <div className="imgContainer">
        {data.SpotImages?.filter((img) => img.preview === true).map((img) => (
          <span key={img?.id} className={`img${img.preview}`}>
            <img
              alt="spotImg"
              className={`img${img.preview}`}
              src={img.url}
            ></img>
          </span>
        ))}
      </div>
      <div className="imgContainer2">
        {data.SpotImages?.filter((img) => img.preview === false).map((img) => (
          <span key={img?.id} className={`img${img.preview}`}>
            <img
              alt="spotImg"
              className={`img${img.preview}`}
              src={img.url}
            ></img>
          </span>
        ))}
      </div>
      </div>
      <span className="textShowContainer">
        <div className="nameDescriptionContainer">
          <div>
            Hosted by {data.Owner?.firstName} {data?.Owner?.lastName}
          </div>
          <br></br>
          <div>{data?.description}</div>
        </div>
        <div className="reviewAndButtonContainer">
          <div className="priceReviewContainer">
            <div>${data?.price} night</div>
            <div>
              ★{data?.numReviews <= 0 ? "New" : data?.avgStarRating}
              {data?.avgStarRating?.length === 1 ? ".0" : ""}{" "}{" "}
              {data?.numReviews <= 0 ? "" : "·"}{" "}
              {data?.numReviews <= 0 ? "" : data?.numReviews}
              {data?.numReviews === 0 ? "" : ""}{" "}
              {data?.numReviews === 1 ? "review" : ""}{" "}
              {data?.numReviews > 1 ? "reviews" : ""}
            </div>
          </div>
          <button
            className="reserveButton"
            onClick={() => alert("Feature Coming Soon...")}
            
          >
            Reserve
          </button>
        </div>
      </span>
      <div>
        ★{data?.numReviews <= 0 ? "New" : data?.avgStarRating}
        {data?.avgStarRating?.length === 1 ? ".0" : ""}{" "}
        {data?.numReviews <= 0 ? "" : "·"}{" "}
        {data?.numReviews <= 0 ? "" : data?.numReviews}
        {data?.numReviews === 0 ? "" : ""}{" "}
        {data?.numReviews === 1 ? "review" : ""}{" "}
        {data?.numReviews > 1 ? "reviews" : ""}
      </div>
     <button className="modalButtonGrey" hidden={hideReviewButton()}>
     <OpenModalButton
     className="noBorder"
        hidden={data.ownerId === session?.id}
        buttonText="Post Your Review"
        modalComponent={
          <CreateReview spotId={spotId}/>
        }
      />
    </button>
    <h4>{data?.numReviews <= 0 && data.ownerId !== session?.id? "Be the first to post a review!" : ""}</h4>
      <div className="reviewContainer">
        {reviewArray.map((review) => (
          <div key={review.id}>
            <h4>{review?.User.firstName}</h4>
            <div>{review?.createdAt.slice(0, 7).split("-")[1]} {review?.createdAt.slice(0, 7).split("-")[0]}</div>
            <br></br>
            <div>{review?.review}</div>
            <br></br>
            <button className="modalButtonGrey" hidden={review?.userId !== session?.id}>
              <OpenModalButton
                hidden={review?.userId !== session?.id}
                buttonText="Delete Review"
                className="noBorder"
                modalComponent={
                  <div className="modalComponent">
                    <h1>Confirm Delete</h1>
                    <h3>Are you sure you want to delete this review?</h3>
                    <button
                      className="deleteInModal"
                      onClick={async () => dispatch(thunkDeleteReview(review?.id)).then(() => dispatch(thunkDisplaySpotDetails(spotId))).then(closeModal())}
                    >
                      Yes (Delete Review)
                    </button>
                    <button
                      className="closeInModal"
                      onClick={() => closeModal()}
                    >
                      No (Keep Review)
                    </button>
                  </div>
                }
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotsShow;
