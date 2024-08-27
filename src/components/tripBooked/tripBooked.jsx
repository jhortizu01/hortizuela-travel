import { useLocation } from "react-router-dom";
import { TravelerNavBar } from "../travlerNavBar/travelerNavbar"
import { Card } from "../card/card";
import './tripBooked.css'
export const TripBooked = () => {
  const location = useLocation();
  const { state } = location;
  const trip = state?.trip;
  const destinations = state?.destinations;
  return (<div className="trip-booked">
    <TravelerNavBar />
    <h1>Trip successfully booked!</h1>
    {trip ? (
        <Card key={trip.id} trip={trip} destinations={destinations} />
      ) : (
        <p>No trip details available.</p>
      )}
  </div>)
}