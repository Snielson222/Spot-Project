import { thunkLoadBookings } from "../../store/booking";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

export const Booking = () => {

    const dispatch = useDispatch()

    const bookings = useSelector((state) => state.bookings)
    console.log("🚀 ~ Booking ~ bookings:", bookings)

    useEffect(() => {
        dispatch(thunkLoadBookings(1))
    }, [dispatch])

    return (<div>
        {bookings[0]}
    </div>)

}

export default Booking;