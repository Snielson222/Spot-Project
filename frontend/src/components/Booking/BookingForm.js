import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateBooking } from '../../store/booking';
const BookingForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    const bookingData = {
      startDate,
      endDate,
    };

    const response = await dispatch(thunkCreateBooking(bookingData, spotId));

    if (response && response.error) {
      setError(response.error.message || 'Something went wrong.');
    } else {
      // Booking created successfully, you can perform any additional actions here
      console.log('Booking created successfully:', response);
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div>
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
