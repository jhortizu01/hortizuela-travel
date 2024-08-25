import './card.css'

export const Card = ({ trip, destinations }) => {
  if (!destinations || !destinations.destinations) return null;

  const destination = destinations.destinations.find(
    (destination) => destination.id === trip.destinationID
  );

  if (!destination) return <div>Destination not found</div>;

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
    </div>
  );
};
