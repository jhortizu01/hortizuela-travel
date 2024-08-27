import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser', // Name of the slice
  initialState: {
    user: null, // Initial state for the user, setting it to null initially
  },
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload; // Action to set the current user (traveler)
    },
    clearCurrentUser(state) {
      state.user = null; // Action to clear the current user (optional, if needed)
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
