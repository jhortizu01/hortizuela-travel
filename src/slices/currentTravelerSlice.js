// currentTravelerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const currentTravelerSlice = createSlice({
  name: 'currentTraveler',
  initialState: {
    traveler: null,
    trips: []
  },
  reducers: {
    setCurrentTraveler(state, action) {
      state.traveler = action.payload; // Correctly set the current traveler
    },
    setTravelerTrips(state, action) {
      state.trips = action.payload; // Corrected typo here
    }
  },
});

export const { setCurrentTraveler, setTravelerTrips } = currentTravelerSlice.actions;

export default currentTravelerSlice.reducer;
