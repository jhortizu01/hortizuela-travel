import { Link } from 'react-router-dom';
import { useGetAllDestinationsQuery, useGetAllTripsQuery } from '../../api/apiSlice';
import { AgencyNavBar } from '../agencyNavBar/agencyNavBar';
import { Card } from '../card/card';
import './todaysTrips.css'
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
      <AgencyNavBar />
      <div className='todays-trips-container'>
      {todaysTrips.length === 0 ? (
        <div>No trips today</div>
      ) : (
        todaysTrips.map((trip) => {
          return (
            <Card key={trip.id} trip={trip} destinations={destinations} />
          );
        })
      )}
      </div>
    </div>
  );
};
