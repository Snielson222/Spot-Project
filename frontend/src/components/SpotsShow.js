import "./SpotsShow.css";
import { useParams } from "react-router-dom";
import { thunkDisplaySpotDetails } from "../store/Spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
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
  


  
  useEffect(() => {
    dispatch(thunkDisplaySpotDetails(spotId));
    dispatch(thunkLoadReviews(spotId));
  }, [dispatch, spotId]);

  const spot = useSelector((state) => state.spots[spotId]);
  const data = { ...spot };
//   console.log("🚀 ~ file: SpotsShow.js:18 ~ SpotsShow ~ data:", data)

  const review1 = useSelector((state) => state.reviews);
  const reviewArray = Object.values(review1);
  // console.log("🚀 ~ file: SpotsShow.js:32 ~ SpotsShow ~ reviewArray:", reviewArray)

  const session = useSelector((state) => state.session.user);
  // console.log("🚀 ~ file: SpotsShow.js:39 ~ SpotsShow ~ session:", session)

 

  return (
    <div className="spotsShowContainer">
      <h1>{data.name}</h1>
      <h3>
        {data.city}, {data.state}, {data.country}
      </h3>
      <div className="imgContainer">
        {data.SpotImages?.map((img) => (
          <span key={img.id} className={`img${img.preview}`}>
            <img
              alt="spotImg"
              className={`img${img.preview}`}
              src={img.url}
            ></img>
          </span>
        ))}
      </div>
      <span className="textContainer">
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
              ★{data?.numReviews <= 0 ? "New" : data?.avgStarRating}{" "}
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
        ★{data?.numReviews <= 0 ? "New" : data?.avgStarRating}{" "}
        {data?.numReviews <= 0 ? "" : "·"}{" "}
        {data?.numReviews <= 0 ? "" : data?.numReviews}
        {data?.numReviews === 0 ? "" : ""}{" "}
        {data?.numReviews === 1 ? "review" : ""}{" "}
        {data?.numReviews > 1 ? "reviews" : ""}
      </div>
     <button hidden={data.ownerId === session.id}>
     <OpenModalButton
        hidden={data.ownerId === session.id}
        buttonText="Post Your Review"
        modalComponent={
          <CreateReview spotId={spotId}/>
        }
      />
    </button>
    <h4>{data?.numReviews <= 0 ? "Be the first to post a review!" : ""}</h4>
      <div className="reviewContainer">
        {reviewArray.map((review) => (
          <div key={review.id}>
            <h4>{review?.User.firstName}</h4>
            <div>{review?.createdAt.slice(0, 7).split("-")[1]} {review?.createdAt.slice(0, 7).split("-")[0]}</div>
            <br></br>
            <div>{review?.review}</div>
            <br></br>
            <button hidden={review?.userId !== session.id}>
              <OpenModalButton
                hidden={review?.userId !== session.id}
                buttonText="Delete Review"
                modalComponent={
                  <div className="modalComponent">
                    <h1>Confirm Delete</h1>
                    <h3>Are you sure you want to delete this review?</h3>
                    <button
                      className="deleteInModal"
                      onClick={() => dispatch(thunkDeleteReview(review.id))}
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
