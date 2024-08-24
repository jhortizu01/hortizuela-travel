import { useSelector } from 'react-redux';
import {
  useGetAllDestinationsQuery,
  useGetAllTravelersQuery,
  useGetAllTripsQuery,
} from '../../api/apiSlice';
import './pendingTrips.css';
import { Link } from 'react-router-dom';

export const PendingTrips = () => {
  const user = Number(useSelector((state) => state.currentTraveler.traveler));

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

  if (tripsIsLoading || destinationsIsLoading) return <div>Loading...</div>;
  if (tripsError || destinationsError) return <div>Error occurred</div>;

  const mytrips = tripsData.trips.filter((trip) => {
    return trip.userID === user;
  });

  console.log('MY TRIPS FROM PENDING', mytrips);

  const pendingTrips = mytrips.filter((trip) => {
    return trip.status === 'pending';
  });

  if (tripsIsLoading || destinationsIsLoading) return <div>Loading...</div>;
  if (tripsError || destinationsError) return <div>Error occurred</div>;

  return (
    <div className='pending-trips-container'>
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
        </nav>
        {/* <div>Welcome Back {singleTraveler.name}</div> */}
      </header>
      {pendingTrips.length > 0 ? (
        pendingTrips.map((trip) => (
          <div key={trip.id} className='pending-trips-card'>
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
        ))
      ) : (
        <div>No pending trips</div>
      )}
    </div>
  );
};
