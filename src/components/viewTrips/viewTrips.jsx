import { Link, useParams } from 'react-router-dom';
import {
  useDeleteSingleTripMutation,
  useGetAllDestinationsQuery,
  useGetAllTripsQuery,
  useModifySingleTripMutation,
} from '../../api/apiSlice';
import { AgencyNavBar } from '../agencyNavBar/agencyNavBar';
import { Card } from '../card/card';

export const ViewTrips = () => {
  const { id } = useParams();

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

  const [modifySingleTrip, { isLoading, isSuccess, isError, error }] =
    useModifySingleTripMutation();

  const [
    deleteSingleTrip,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteSingleTripMutation();
  if (!trips || trips.length === 0)
    return (
      <div role='alert' aria-live='polite'>
        No trips found.
      </div>
    );

  if (destinationsIsLoading)
    return (
      <div role='alert' aria-live='polite'>
        Loading destinations...
      </div>
    );
  if (destinationsError)
    return (
      <div role='alert' aria-live='assertive'>
        Error loading destinations: {destinationsError.message}
      </div>
    );

  const mytrips = trips.trips.filter((trip) => {
    return trip.userID === parseInt(id);
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
      <AgencyNavBar />

      <div>Total cost of all trips: {tripCost()}</div>
      <div className='destination-card-container'>
        {mytrips.map((trip) => {
          return <Card key={trip.id} trip={trip} destinations={destinations} />;
        })}
      </div>
    </div>
  );
};
