import { thunkLoadOneBooking } from "../../store/booking";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Booking = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => Object.values(state.bookings)); // Convert object to array
    console.log("🚀 ~ Booking ~ bookings:", bookings);

    const { spotId } = useParams();
    console.log("🚀 ~ Booking ~ spotId:", spotId)

    useEffect(() => {
        dispatch(thunkLoadOneBooking(spotId));
    }, [dispatch]);

    return (
        <div>
            {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                    <div>
                        <h3>{booking.Spot.name}</h3>
                        <p>{booking.Spot.address}, {booking.Spot.city}, {booking.Spot.state}, {booking.Spot.country}</p>
                        <p>Price: ${booking.Spot.price}</p>
                        <p>Booking Dates: {booking.startDate} to {booking.endDate}</p>
                        <p>Customer ID: {booking.userId}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Booking;