import {
  useGetAllDestinationsQuery,
  useGetAllTripsQuery,
} from '../../api/apiSlice';
import './agency.css';
import { Card } from '../card/card';
import { AgencyNavBar } from '../agencyNavBar/agencyNavBar';

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

  if (allTripsIsLoading) return <p aria-live='polite'>Loading trips...</p>;
  if (allTripsError)
    return (
      <section aria-live='assertive'>
        Error loading trips: {allTripsError.message}
      </section>
    );
  if (destinationsIsLoading)
    return <p aria-live='polite'>Loading destinations...</p>;
  if (destinationsError)
    return (
      <section aria-live='assertive'>
        Error loading destinations: {destinationsError.message}
      </section>
    );

  const pendingTrips = allTrips.trips.filter((trip) => {
    return trip.status === 'pending';
  });

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
      <AgencyNavBar />
      <p>Total Revenue: {totalRevenue()}</p>
      <h2>Pending Trips</h2>
      {pendingTrips.length > 0 ? (
        <ul className='pending-trip-container'>
          {pendingTrips.map((trip) => (
            <li key={trip.id}>
              <Card trip={trip} destinations={destinations} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No pending trips found.</div>
      )}
    </div>
  );
};
