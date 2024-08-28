import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddNewTripMutation,
  useGetAllDestinationsQuery,
  useGetAllTripsQuery,
} from '../../api/apiSlice';
import './bookTrip.css';
import { Link, useNavigate } from 'react-router-dom';
import { setTravelerTrips } from '../../slices/currentTravelerSlice';
import { TravelerNavBar } from '../travlerNavBar/travelerNavbar';
import { FormControl, InputLabel, Menu, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const BookTrip = () => {
  const dispatch = useDispatch();
  const traveler = useSelector((state) => state.currentTraveler.traveler);
  const trips = useSelector((state) => state.currentTraveler.trips);
  const [addNewTrip, { isLoading, isSuccess, isError, error }] =
    useAddNewTripMutation();
  const [selectedDestination, setSelectedDestination] = useState('1');
  const [numberOfTravelers, setNumberOfTravelers] = useState('1');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [duration, setDuration] = useState('1');
  const [errorSubmitting, setErrorSubmitting] = useState(true);
  const navigate = useNavigate();
  const {
    data: allTrips,
    error: allTripsError,
    isLoading: allTripsIsLoading,
    refetch: refetchTrips,
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
    console.log(event.target.value);
    setSelectedDate(event.target.value);
  };

  function convertDateFormat(dateString) {
    return dayjs(dateString).format('YYYY/MM/DD');
  }

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = () => {
    const newTrip = {
      id: allTrips.trips.length + 1,
      userID: traveler,
      destinationID: parseInt(selectedDestination, 10),
      travelers: parseInt(numberOfTravelers, 10),
      date: convertDateFormat(selectedDate),
      duration: parseInt(duration, 10),
      status: 'pending',
      suggestedActivities: [],
    };

    addNewTrip(newTrip);

    const userTrips = allTrips.trips.filter((trip) => {
      return trip.userID === Number(traveler);
    });
    console.log('userTrips', userTrips);
    dispatch(setTravelerTrips(userTrips));

    !isError
      ? navigate('/tripbooked', {
          state: { trip: newTrip, destinations: destinations },
        })
      : setErrorSubmitting(false);
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
      <h1 className='estimated-cost'>Estimated Cost {tripCost()}</h1>
      <FormControl
        style={{ width: '400px', marginTop: '20px', backgroundColor: 'white' }}
      >
        <InputLabel id='location-label'>Location</InputLabel>
        <Select
          labelId='location-label'
          id='location-select'
          value={selectedDestination}
          label='location'
          onChange={handleDestinationChange}
        >
          {destinations.destinations.map((destination) => {
            return (
              <MenuItem key={destination.id} value={destination.id}>
                {destination.destination}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br></br>
      <FormControl
        aria-describedby='travelers-description'
        style={{ width: '400px', marginTop: '20px', backgroundColor: 'white' }}
      >
        <InputLabel id='number-of-travelers-label'>
          Number of Travelers
        </InputLabel>
        <Select
          labelId='number-of-traveler-select-label'
          id='number-of-traveler-select'
          value={numberOfTravelers}
          label='Number of Travelers'
          onChange={handleTravlersChange}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: '400px', marginTop: '20px', backgroundColor: 'white' }}
          value={selectedDate}
          onChange={(newValue) => handleDateChange(newValue)}
          aria-label='Select trip start date'
        />
      </LocalizationProvider>
      <FormControl
        style={{ width: '400px', marginTop: '25px', backgroundColor: 'white' }}
      >
        <InputLabel id='duration-label'>Duration</InputLabel>
        <Select
          labelId='duration-select-label'
          id='duration-select'
          value={duration}
          label='duration'
          onChange={handleDurationChange}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button className='submit' onClick={handleSubmit}>
        Submit
      </button>
      <div role='alert' aria-live='assertive' hidden={errorSubmitting}>
        Error submitting request. Try again later.
      </div>
    </div>
  );
};
