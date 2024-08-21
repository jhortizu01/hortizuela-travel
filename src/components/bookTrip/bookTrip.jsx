import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewTripMutation, useGetAllDestinationsQuery, useGetAllTripsQuery } from '../../api/apiSlice';

export const BookTrip = () => {
  const traveler = useSelector((state) => state.currentTraveler.traveler);
  const [addNewTrip, {isLoading, isSuccess, isError, error}] = useAddNewTripMutation()
  const [selectedDestination, setSelectedDestination] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [duration, setDuration] = useState('');
  
  const {
    data: allTrips,
    error: allTripsError,
    isLoading: allTripsIsLoading,
  } = useGetAllTripsQuery();

  const {
    data: destinations,
    error: destinationsError,
    isLoading: destinationsIsLoading,
  } = useGetAllDestinationsQuery();

  if (destinationsIsLoading) return <div>Loading destinations...</div>;
  if (destinationsError)
    return <div>Error loading destinations: {destinationsError.message}</div>;

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleTravlersChange = (event) => {
    setNumberOfTravelers(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  function convertDateFormat(dateString) {
    const [year, month, day] = dateString.split('-');
    
    return `${year}/${month}/${day}`;
  }

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = () => {
    console.log('number of trips', allTrips.trips.length + 1)
    addNewTrip({
      id: allTrips.trips.length + 1,
      userID: traveler.id,
      destinationID: parseInt(selectedDestination, 10),
      travelers: parseInt(numberOfTravelers, 10),
      date: convertDateFormat(selectedDate),
      duration: parseInt(duration, 10),
      status: 'pending',
      suggestedActivities: []
    })
  }

  if(isError) {
    console.error('Error:', error)
  }

  console.log('date', selectedDate)

  return (
    <div>
      <div>Welcome back {traveler.name}</div>
      <label htmlFor='options'>Choose a Destination:</label>
      <select
        id='options'
        value={selectedDestination}
        onChange={handleDestinationChange}
      >
        {/* <option value=''>--Please choose an option--</option>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option> */}
        {destinations.destinations.map((destination) => {
          return (
            <option key={destination.id} value={destination.id}>
              {destination.destination}
            </option>
          );
        })}
      </select>
      <label htmlFor='options'>Choose number of Travelers:</label>
      <select
        id='options'
        value={numberOfTravelers}
        onChange={handleTravlersChange}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>

      <label htmlFor='date-input'>Choose a date:</label>
      <input
        type='date'
        id='date-input'
        value={selectedDate}
        onChange={handleDateChange}
      />

      <label htmlFor='options'>Choose number of days:</label>
      <select
        id='options'
        value={duration}
        onChange={handleDurationChange}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
