import { thunkLoadBookings } from "../../store/booking";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

export const Booking = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkLoadBookings(1))
    }, [dispatch])

    return (<div>
        BOOKING!!!!
    </div>)

}

export default Booking;