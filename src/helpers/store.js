// store.js
import { configureStore } from '@reduxjs/toolkit';
import travelersReducer from "../slices/allTravelersSlice"
import { apiSlice } from '../api/apiSlice';
import currentTravelerReducer from '../slices/currentTravelerSlice'
import currentUserReducer from '../slices/currentUserSlice'
const store = configureStore({
  reducer: {
    allTravelers: travelersReducer,
    currentTraveler: currentTravelerReducer,
    currentUser: currentUserReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;