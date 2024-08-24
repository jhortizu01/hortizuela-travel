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
import { Login } from './components/login/login';
import { Agency } from './components/agency/agency';
import { TodaysTrips } from './components/todaysTrips/todaysTrips';
import { PendingTrips } from './components/pendingTrips/pendingTrips';

function App() {
  return (
    <div className="container">
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<UserTrips />} />
          <Route path='/book' element={<BookTrip />} />
          <Route path='/agency' element={<Agency />} />
          <Route path='/todaystrips' element={<TodaysTrips />} />
          <Route path='/pendingtrips' element={<PendingTrips />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
