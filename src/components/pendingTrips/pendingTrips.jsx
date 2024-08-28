import { useSelector } from 'react-redux';
import {
  useGetAllDestinationsQuery,
  useGetAllTravelersQuery,
  useGetAllTripsQuery,
} from '../../api/apiSlice';
import './pendingTrips.css';
import { Link } from 'react-router-dom';
import { TravelerNavBar } from '../travlerNavBar/travelerNavbar';
import { Card } from '../card/card';

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

  if (tripsIsLoading || destinationsIsLoading)
    return (
      <div aria-live='polite' role='status'>
        Loading...
      </div>
    );
  if (tripsError || destinationsError)
    return (
      <div aria-live='assertive' role='alert'>
        Error occurred
      </div>
    );

  return (
    <div>
      <TravelerNavBar />
      <div className='pending-trips-container'>
        <h1>Pending Trips</h1>
        {pendingTrips.length > 0 ? (
          pendingTrips.map((trip) => (
            <Card trip={trip} destinations={destinations} key={trip.id} />
          ))
        ) : (
          <p>No pending trips</p>
        )}
      </div>
    </div>
  );
};
