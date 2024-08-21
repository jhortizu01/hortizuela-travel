// App.js
import { useState, useEffect } from 'react';
import {
  useGetAllDestinationsQuery,
  useGetAllTravelersQuery,
  useGetAllTripsQuery,
  useGetSingleTravelerQuery,
} from './api/apiSlice';
import './App.css';
import { useDispatch } from 'react-redux';
import {
  setCurrentTraveler,
  setTravelerTrips,
} from './slices/currentTravelerSlice';
import { UserTrips } from './components/userTrips/userTrips';
import { Link, Route, Router, Routes } from 'react-router-dom';
import { BookTrip } from './components/bookTrip/bookTrip';

function App() {
  const dispatch = useDispatch();
  const {
    data: currentTraveler,
    error: currentTravelerError,
    isLoading: currentTravelerIsLoading,
  } = useGetSingleTravelerQuery({ userId: 50 });

  const {
    data: allTrips,
    error: allTripsError,
    isLoading: allTripsIsLoading,
  } = useGetAllTripsQuery();

  useEffect(() => {
    if (currentTraveler) {
      dispatch(setCurrentTraveler(currentTraveler));
    }
  }, [currentTraveler, dispatch]);

  useEffect(() => {
    if (allTrips && currentTraveler) {
      // Ensure the correct structure for allTrips
      const trips = allTrips.trips.filter(
        (trip) => trip.userID === currentTraveler.id
      );
      dispatch(setTravelerTrips(trips));
    }
  }, [allTrips, currentTraveler, dispatch]);

  if (currentTravelerIsLoading || allTripsIsLoading)
    return <div>Loading...</div>;
  if (currentTravelerError || allTripsError) return <div>Error occurred</div>;

  return (
    <div>
      <header>
        <nav>
          <button>
            <Link to='/book'>Book a trip</Link>
          </button>
          <button>
            <Link to='/'>Home</Link>
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<UserTrips />} />
          <Route path='/book' element={<BookTrip />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
