import { useState } from 'react';
import { useGetAllTravelersQuery } from '../../api/apiSlice';
import { current } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { AgencyNavBar } from '../agencyNavBar/agencyNavBar';
import { Autocomplete, TextField } from '@mui/material';

export const FindUser = () => {
  const [searchData, setSearchData] = useState('');
  const [currentTraveler, setCurrentTraveler] = useState('');
  const navigate = useNavigate();
  const {
    data: allTravelers,
    error: allTravelersError,
    isLoading: allTravelersIsLoading,
  } = useGetAllTravelersQuery();

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('event', searchData);
    console.log('allTravelers', allTravelers);

    const searchQuery = searchData.toLowerCase();

    const filteredTravelers = allTravelers.travelers.filter((traveler) => {
      return traveler.name.toLowerCase().includes(searchQuery);
    });

    console.log('filtered', filteredTravelers);
    setCurrentTraveler(filteredTravelers);
  };

  const handleViewTrips = (id) => {
    navigate(`/trips/${id}`);
  };

  console.log('all travs', allTravelers)

  if (allTravelersIsLoading) return <div>Loading travelers</div>;
  if (allTravelersError)
    return <div>Error loading destinations: {allTravelers.Error.message}</div>;

  return (
    <div>
      <AgencyNavBar />
     <Autocomplete
        disablePortal
        id="search-for-user"
        options={
          allTravelers.travelers.map((traveler) => ({
            label: traveler.name,
            id: traveler.id, // Include ID here
          }))
        }
        renderInput={(params) => <TextField {...params} label="Traveler" />}
        onChange={(event, value) => {
          if (value && value.id) {
            handleViewTrips(value.id); // Call handleViewTrips with the selected traveler's ID
          }
        }}
      />
    </div>
  );
};
