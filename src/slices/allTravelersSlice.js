import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 0, name: '', travelerType: '' },
];

const travelersSlice = createSlice({
  name: 'travelers',
  initialState,
  reducers: {},
});

//export const {} = travelersSlice.actions;
export default travelersSlice.reducer;