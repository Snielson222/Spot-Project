import { thunkLoadOneBooking } from "../../store/booking";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Booking = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => Object.values(state.bookings)); // Convert object to array
    console.log("🚀 ~ Booking ~ bookings:", bookings)
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(thunkLoadOneBooking(spotId));
    }, [dispatch, spotId]);

    if (!bookings || bookings.length === 0) {
        return (
            <div className="error-message">
                <h2>No bookings available for this spot.</h2>
                <p>Check back later or explore other spots.</p>
            </div>
        );
    }

    return (
        <div>
            {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                    <div>
                        <h3>{booking.Spot?.name}</h3>
                        <p>Address: {booking.Spot?.address}, {booking.Spot?.city}, {booking.Spot?.state}, {booking.Spot?.country}</p>
                        <p>Price Per Night: ${booking.Spot?.price}</p>
                        <p>Booking Dates: {formatDate(booking.startDate)} to {formatDate(booking.endDate)}</p>
                        <p>Customer ID: {booking.userId}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default Booking;
