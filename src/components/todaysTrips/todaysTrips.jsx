import { Link } from 'react-router-dom';
import { useGetAllDestinationsQuery, useGetAllTripsQuery } from '../../api/apiSlice';

export const TodaysTrips = () => {
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(today.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

    return `${year}/${month}/${day}`;
  };

  const todaysTrips = allTrips.trips.filter((trip) => {
    return trip.date === getCurrentDate();
  });

  console.log('alltrips', allTrips);
  console.log('todays trips', todaysTrips);

  if (allTripsIsLoading) return <div>Loading...</div>;
  if (allTripsError)
    return <div>Error loading trips: {allTripsError.message}</div>;

  return (
    <div>
      <nav>
        <button>
          <Link to='/agency'>Home</Link>
        </button>
        <button>
          <Link to='/finduser'>Find User</Link>
        </button>
      </nav>
      {todaysTrips.length === 0 ? (
        <div>No trips today</div>
      ) : (
        allTrips.trips.map((trip) => {
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
        })
      )}
    </div>
  );
};
