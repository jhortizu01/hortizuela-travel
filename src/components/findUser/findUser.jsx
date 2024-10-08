import { useState } from 'react';
import { useGetAllTravelersQuery } from '../../api/apiSlice';
import { current } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { AgencyNavBar } from '../agencyNavBar/agencyNavBar';
import { Autocomplete, TextField } from '@mui/material';
import './findUser.css';
export const FindUser = () => {
  const navigate = useNavigate();
  const {
    data: allTravelers,
    error: allTravelersError,
    isLoading: allTravelersIsLoading,
  } = useGetAllTravelersQuery();

  const handleViewTrips = (id) => {
    navigate(`/trips/${id}`);
  };

  if (allTravelersIsLoading) return <div>Loading travelers</div>;
  if (allTravelersError)
    return (
      <div role='alert'>
        Error loading destinations: {allTravelers.Error.message}
      </div>
    );

  return (
    <div className='search-for-user'>
      <AgencyNavBar />
      <h1 className='title'>Search for user:</h1>
      <Autocomplete
        disablePortal
        id='search-for-user'
        options={allTravelers.travelers.map((traveler) => ({
          label: traveler.name,
          id: traveler.id,
        }))}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Traveler'
            InputProps={{
              ...params.InputProps,
              style: {
                backgroundColor: 'white',
              },
            }}
          />
        )}
        onChange={(event, value) => {
          if (value && value.id) {
            handleViewTrips(value.id);
          }
        }}
        sx={{ width: '350px', margin: '20px auto 0 auto' }}
        aria-labelledby='search-for-user-label'
      />
    </div>
  );
};
