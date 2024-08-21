// UserTrips.js
import { useSelector } from 'react-redux';
import { useGetAllDestinationsQuery } from '../../api/apiSlice';

export const UserTrips = () => {
  const trips = useSelector((state) => state.currentTraveler.trips);
  const {data: destinations, error: destinationsError, isLoading: destinationsIsLoading} = useGetAllDestinationsQuery();
  console.log('***', destinations);
  
  if (!trips || trips.length === 0) return <div>No trips found.</div>;


  if (destinationsIsLoading) return <div>Loading destinations...</div>;
  if (destinationsError) return <div>Error loading destinations: {destinationsError.message}</div>;

  const tripCost = () => {
    const cost = trips.reduce((accumulator, trip) => {
      const destination = destinations.destinations.find(dest => dest.id === trip.destinationID);
      
      if (destination) {
        const lodging = destination.estimatedLodgingCostPerDay * trip.duration;
        const flights = destination.estimatedFlightCostPerPerson * trip.travelers;
        const total = lodging + flights;
        const fee = total * 0.10;
        return accumulator + total + fee;
      }
  
      return accumulator; // If destination is not found, just return the accumulator as is
    }, 0);

    return `$${parseInt(cost).toLocaleString('en-US')}`
  }
  
  console.log('cost', tripCost())

  return (
    <div>
      <div>Total cost of all trips: {tripCost()}</div>
      {trips.map((trip) => {
        return (
          <div key={trip.id}>
            <div>Date: {trip.date}</div>
            <div>Travelers: {trip.travelers}</div>
            <div>Duration: {trip.duration}</div>
            <div>Destination: {destinations.destinations.find(destination => destination.id === trip.destinationID).destination}</div>
            <div>Suggested Activities: {trip.suggestedActivities}</div>
            <div>Status: {trip.status}</div>
          </div>
        );
      })}
    </div>
  );
};
