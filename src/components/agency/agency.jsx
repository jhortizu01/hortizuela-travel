import { Link } from 'react-router-dom';
import {
  useGetAllDestinationsQuery,
  useGetAllTripsQuery,
  useModifySingleTripMutation,
} from '../../api/apiSlice';
import './agency.css';

export const Agency = () => {
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

  const [modifySingleTrip, { isLoading, isSuccess, isError, error }] =
    useModifySingleTripMutation();
  
  if (allTripsIsLoading) return <div>Loading...</div>;
  if (allTripsError)
    return <div>Error loading trips: {allTripsError.message}</div>;
  if (destinationsIsLoading) return <div>Loading destinations...</div>;
  if (destinationsError)
    return <div>Error loading destinations: {destinationsError.message}</div>;
  
  const pendingTrips = allTrips.trips.filter((trip) => {
    return trip.status === 'pending';
  });

  console.log(pendingTrips)

  const approveTrip = (trip) => {
    modifySingleTrip({id: trip, status: 'approved', suggestedActivites: []})
  }

  const totalRevenue = () => {
    const totalCost = allTrips.trips.reduce((accumulator, trip) => {
      if (trip.status === 'approved') {
        const destination = destinations.destinations.find(
          (dest) => dest.id === trip.destinationID
        );

        if (destination) {
          const lodging =
            destination.estimatedLodgingCostPerDay * trip.duration;
          const flights =
            destination.estimatedFlightCostPerPerson * trip.travelers;
          const total = lodging + flights;
          return accumulator + total; // Add the total cost of the trip to the accumulator
        }
      }
      return accumulator; // If the trip is not approved or destination is not found, just return the accumulator as is
    }, 0);

    return `$${parseInt(totalCost * 0.1).toLocaleString('en-US')}`;
  };

  return (
    <div className='agency-page'>
      <nav>
        <button>
          <Link to='/todaystrips'>Today's Trips</Link>
        </button>
        <button>
          <Link to='/finduser'>Find User</Link>
        </button>
      </nav>
      <div>Total Revenue: {totalRevenue()}</div>
      {pendingTrips.length > 0 ? (
        <div className='pending-trip-container'>
          {pendingTrips.map((trip) => (
            <div key={trip.id} className='pending-trip-card'>
              <h3>Trip ID: {trip.id}</h3>
              <p>Destination: {trip.destinationID}</p>
              <p>Travelers: {trip.travelers}</p>
              <p>Date: {trip.date}</p>
              <p>Duration: {trip.duration} days</p>
              <p>Status: {trip.status}</p>
              <button onClick={() => approveTrip(trip.id)}>Approve Trip</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No pending trips found.</div>
      )}
    </div>
  );
};
