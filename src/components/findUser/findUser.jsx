import { useState } from 'react';
import { useGetAllTravelersQuery } from '../../api/apiSlice';
import { current } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <nav>
        <button>
          <Link to='/agency'>Home</Link>
        </button>
        <button>
          <Link to='/todaystrips'>Today's Trips</Link>
        </button>
        <button>
          <Link to='/login'>Logout</Link>
        </button>
      </nav>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={searchData}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div className='found-travelers'>
        {currentTraveler.length > 0 ? (
          currentTraveler.map((traveler) => {
            return (
              <div className='traveler-card' key={traveler.id}>
                <div>{traveler.name}</div>
                <button onClick={() => handleViewTrips(traveler.id)}>
                  View their trips
                </button>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
