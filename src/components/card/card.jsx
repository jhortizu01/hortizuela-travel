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
    <div className='card'>
      <img
        src={destination.image}
        alt={`Image of ${destination.destination}`}
      />
      <div>Date: {trip.date}</div>
      <div>Travelers: {trip.travelers}</div>
      <div>Duration: {trip.duration}</div>
      <div>Destination: {destination.destination}</div>
      <div>Suggested Activities: {trip.suggestedActivities}</div>
      <div>Status: {trip.status}</div>
      {currentUser === 'agency' ? (
        trip.status === 'pending' ? (
          <div className='agency-buttons'>
            <button className='approve' onClick={() => approveTrip(trip.id)}>
              Approve
            </button>{' '}
            <button className='delete' onClick={() => deleteTrip(trip.id)}>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button className='delete' onClick={() => deleteTrip(trip.id)}>
              Delete
            </button>
          </div>
        )
      ) : null}
    </div>
  );
};
