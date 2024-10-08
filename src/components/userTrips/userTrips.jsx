// UserTrips.js
import { useSelector } from 'react-redux';
import {
  useGetAllDestinationsQuery,
  useGetAllTripsQuery,
  useGetSingleTravelerQuery,
} from '../../api/apiSlice';
import './userTrips.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { TravelerNavBar } from '../travlerNavBar/travelerNavbar';
import { Card } from '../card/card';
import Carousel from 'react-material-ui-carousel';

export const UserTrips = () => {
const user = Number(useSelector((state) => state.currentTraveler.traveler));
  const {
    data: singleTraveler,
    error,
    loading,
  } = useGetSingleTravelerQuery(user);

  const {
    data: trips,
    error: tripsError,
    isLoading: tripsIsLoading,
  } = useGetAllTripsQuery();

  const {
    data: destinations,
    error: destinationsError,
    isLoading: destinationsIsLoading,
  } = useGetAllDestinationsQuery();
  console.log('***', trips);

  if (tripsIsLoading) return <div  role="alert" aria-live="polite">Loading Trips</div>
  if (!trips || trips.length === 0) return <div  role="alert" aria-live="polite">No trips found.</div>;

  if (destinationsIsLoading) return <div  role="alert" aria-live="polite">Loading destinations...</div>;
  if (destinationsError)
    return <div role="alert" aria-live="assertive">Error loading destinations: {destinationsError.message}</div>;

  const mytrips = trips.trips.filter((trip) => {
    return trip.userID === user;
  });

  const tripCost = () => {
    const cost = trips.trips.reduce((accumulator, trip) => {
      const destination = destinations.destinations.find(
        (dest) => dest.id === trip.destinationID
      );

      if (destination) {
        const lodging = destination.estimatedLodgingCostPerDay * trip.duration;
        const flights =
          destination.estimatedFlightCostPerPerson * trip.travelers;
        const total = lodging + flights;
        const fee = total * 0.1;
        return accumulator + total + fee;
      }

      return accumulator; // If destination is not found, just return the accumulator as is
    }, 0);

    return `$${parseInt(cost).toLocaleString('en-US')}`;
  };

  return (
    <div className='home-page'>
      <TravelerNavBar />
      <h1 className='welcome'>Welcome Back, {singleTraveler.name}</h1>
      <h2>Total cost of all trips: {tripCost()}</h2>
      <div className='destination-card-container'>
        {mytrips.map((trip) => {
          return <Card trip={trip} destinations={destinations} key={trip.id} />;
        })}
      </div>
    </div>
  );
};
