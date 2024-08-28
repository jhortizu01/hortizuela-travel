import { useSelector } from 'react-redux';
import './card.css';
import {
  useDeleteSingleTripMutation,
  useModifySingleTripMutation,
} from '../../api/apiSlice';

export const Card = ({ trip, destinations }) => {
  const currentUser = useSelector((state) => state.currentUser.user);

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

  const approveTrip = (trip) => {
    modifySingleTrip({ id: trip, status: 'approved', suggestedActivites: [] });
  };

  const deleteTrip = (trip) => {
    console.log('trip id', typeof trip);
    deleteSingleTrip(trip);
  };

  if (!destinations || !destinations.destinations) return null;

  const destination = destinations.destinations.find(
    (destination) => destination.id === trip.destinationID
  );

  console.log('TRIP FROM CARD', trip);

  if (!destination) return <div>Destination not found</div>;
  console.log('CURR USER', currentUser);
  return (
    <article className='card' aria-labelledby={`trip-${trip.id}-destination`}>
      <img
        src={destination.image}
        alt={`Image of ${destination.destination}`}
      />
      <p>Date: {trip.date}</p>
      <p>Travelers: {trip.travelers}</p>
      <p>Duration: {trip.duration}</p>
      <p>Destination: {destination.destination}</p>
      <p>Suggested Activities: {trip.suggestedActivities}</p>
      <p>Status: {trip.status}</p>
      {currentUser === 'agency' ? (
        trip.status === 'pending' ? (
          <div className='agency-buttons'>
            <button
              aria-label={`Approve trip to ${destination.destination}`}
              className='approve'
              onClick={() => approveTrip(trip.id)}
            >
              Approve
            </button>{' '}
            <button
              aria-label={`Delete trip to ${destination.destination}`}
              className='delete'
              onClick={() => deleteTrip(trip.id)}
            >
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button
              aria-label={`Delete trip to ${destination.destination}`}
              className='delete'
              onClick={() => deleteTrip(trip.id)}
            >
              Delete
            </button>
          </div>
        )
      ) : null}
      {isError && (
        <div role="alert" aria-live="assertive">
          Error: {error.message}
        </div>
      )}
      {isDeleteError && (
        <div role="alert" aria-live="assertive">
          Error deleting trip: {deleteError.message}
        </div>
      )}
    </article>
  );
};
