import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateBooking } from '../../store/booking';
import './booking.css';

const BookingForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('End date must be after the start date.');
      return;
    }

    const bookingData = {
      startDate,
      endDate,
    };

    try {
      const response = await dispatch(thunkCreateBooking(bookingData, spotId));

      if (response && response.errors) {
        const { errors } = response;
        if (errors && errors.startDate) {
          setError(errors.startDate);
        } else if (errors && errors.endDate) {
          setError(errors.endDate);
        } else if (errors && typeof errors === 'string') {
          setError(errors);
        } else if (errors === "message") {
          setError(errors);
        } else {
          setError('An error occurred while creating the booking.');
        }
      } else {
        // Booking created successfully
        setSuccessMessage(`Booking created successfully for ${startDate} to ${endDate}`);
        setStartDate('');
        setEndDate('');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('End date cannot be before the start date.');
      } else {
        setError('An error occurred while creating the booking.');
      }
    }
  };

  return (
    <div className="booking-form-container">
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
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
