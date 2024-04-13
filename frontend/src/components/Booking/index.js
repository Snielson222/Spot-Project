import { thunkLoadBookings } from "../../store/booking";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Booking = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => Object.values(state.bookings)); // Convert object to array
    console.log("🚀 ~ Booking ~ bookings:", bookings);

    useEffect(() => {
        dispatch(thunkLoadBookings(1));
    }, [dispatch]);

    return (
        <div>
            {bookings.map((booking) => (
                <div key={booking.id}>
                    {booking.id} - {booking.startDate} - {booking.endDate}
                </div>
            ))}
        </div>
    );
};

export default Booking;