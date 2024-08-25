import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddNewTripMutation,
  useGetAllDestinationsQuery,
  useGetAllTripsQuery,
} from '../../api/apiSlice';
import './bookTrip.css';
import { Link } from 'react-router-dom';
import { setTravelerTrips } from '../../slices/currentTravelerSlice';
import { TravelerNavBar } from '../travlerNavBar/travelerNavbar';

export const BookTrip = () => {
  const dispatch = useDispatch()
  const traveler = useSelector((state) => state.currentTraveler.traveler);
  const trips = useSelector((state) => state.currentTraveler.trips)
  const [addNewTrip, { isLoading, isSuccess, isError, error }] =
    useAddNewTripMutation();
  const [selectedDestination, setSelectedDestination] = useState('1');
  const [numberOfTravelers, setNumberOfTravelers] = useState('1');
  const [selectedDate, setSelectedDate] = useState('');
  const [duration, setDuration] = useState('1');

  const {
    data: allTrips,
    error: allTripsError,
    isLoading: allTripsIsLoading,
    refetch: refetchTrips
  } = useGetAllTripsQuery();

  const {
    data: destinations,
    error: destinationsError,
    isLoading: destinationsIsLoading,
  } = useGetAllDestinationsQuery();

  useEffect(() => {
    if (isSuccess) {
      refetchTrips(); // Call the refetch function after a successful trip addition
    }
  }, [isSuccess, refetchTrips]);


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
    console.log('number of trips', allTrips.trips.length + 1);
    addNewTrip({
      id: allTrips.trips.length + 1,
      userID: traveler,
      destinationID: parseInt(selectedDestination, 10),
      travelers: parseInt(numberOfTravelers, 10),
      date: convertDateFormat(selectedDate),
      duration: parseInt(duration, 10),
      status: 'pending',
      suggestedActivities: [],
    });
    console.log('allTrips', allTrips)
    console.log('traveler', traveler)
    const userTrips = allTrips.trips.filter(trip => {
      return trip.userID === Number(traveler)
    })
    console.log('userTrips', userTrips)
    dispatch(setTravelerTrips(userTrips))
  };

  if (isError) {
    console.error('Error:', error);
  }

  console.log('date', selectedDate);

  const tripCost = () => {
    if ((selectedDestination, numberOfTravelers, duration)) {
      const destination = destinations.destinations.find(
        (destination) => destination.id === parseInt(selectedDestination)
      );
      const lodging =
        destination.estimatedLodgingCostPerDay * parseInt(duration);
      const flights =
        destination.estimatedFlightCostPerPerson * parseInt(numberOfTravelers);
      const total = lodging + flights;
      const fee = total * 0.1;
      const totalCost = total + fee;
      return `$${parseInt(totalCost).toLocaleString('en-US')}`;
    }
  };

  return (
    <div className='booking-container'>
      <TravelerNavBar />

      <div>Welcome back {traveler.name}</div>
      <div>Estimated Cost {tripCost()}</div>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <label htmlFor='date-input'>Choose a date:</label>
        <input
          type='date'
          id='date-input'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor='options'>Choose number of days:</label>
        <select id='options' value={duration} onChange={handleDurationChange}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
