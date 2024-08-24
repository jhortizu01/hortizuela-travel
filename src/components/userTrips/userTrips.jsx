// UserTrips.js
import { useSelector } from 'react-redux';
import {
  useGetAllDestinationsQuery,
  useGetAllTripsQuery,
  useGetSingleTravelerQuery,
} from '../../api/apiSlice';
import './userTrips.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const UserTrips = () => {
  const trips = useSelector((state) => state.currentTraveler.trips);
  const user = Number(useSelector((state) => state.currentTraveler.traveler));
  const {
    data: singleTraveler,
    error,
    loading,
  } = useGetSingleTravelerQuery(user);

  const {
    data: tripsData,
    error: tripsError,
    isLoading: tripsIsLoading,
  } = useGetAllTripsQuery();

  const {
    data: destinations,
    error: destinationsError,
    isLoading: destinationsIsLoading,
  } = useGetAllDestinationsQuery();
  console.log('***', trips);

  if (!trips || trips.length === 0) return <div>No trips found.</div>;

  if (destinationsIsLoading) return <div>Loading destinations...</div>;
  if (destinationsError)
    return <div>Error loading destinations: {destinationsError.message}</div>;

  const mytrips = tripsData.trips.filter((trip) => {
    return trip.userID === user;
  });

  const tripCost = () => {
    const cost = trips.reduce((accumulator, trip) => {
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
      <header>
        <nav>
          <button>
            <Link to='/book'>Book a trip</Link>
          </button>
          <button>
            <Link to='/home'>Home</Link>
          </button>
          <button>
            <Link to='/pendingtrips'>Pending Trips</Link>
          </button>
          <button>
          <Link to='/login'>Logout</Link>
        </button>
        </nav>
        {/* <div>Welcome Back {singleTraveler.name}</div> */}
      </header>

      <div>Total cost of all trips: {tripCost()}</div>
      <div className='destination-card-container'>
        {mytrips.map((trip) => {
          return (
            <div key={trip.id} className='destination-card'>
              <img
                src={
                  destinations.destinations.find(
                    (destination) => destination.id === trip.destinationID
                  ).image
                }
                alt={`image of ${
                  destinations.destinations.find(
                    (destination) => destination.id === trip.destinationID
                  ).destination
                }`}
              />
              <div>Date: {trip.date}</div>
              <div>Travelers: {trip.travelers}</div>
              <div>Duration: {trip.duration}</div>
              <div>
                Destination:{' '}
                {
                  destinations.destinations.find(
                    (destination) => destination.id === trip.destinationID
                  ).destination
                }
              </div>
              <div>Suggested Activities: {trip.suggestedActivities}</div>
              <div>Status: {trip.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
