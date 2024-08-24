import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTraveler, setTravelerTrips } from '../../slices/currentTravelerSlice';
import { useNavigate } from 'react-router-dom';
import { useGetAllTripsQuery, useGetSingleTravelerQuery } from '../../api/apiSlice';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: allTrips,
    error: allTripsError,
    isLoading: allTripsIsLoading,
  } = useGetAllTripsQuery();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateUsername(userName) && password === 'traveler') {
      setLoginError(false);
    } else {
      if (userName.includes("traveler") && password === 'traveler') {
        dispatch(setCurrentTraveler(getUserId(userName)));
        const trips = allTrips.trips.filter(
          (trip) => trip.userID === getUserId(userName)
        );
  
        dispatch(setTravelerTrips(trips));
        navigate('/home');
      } else if (userName.includes('agency') && password === 'traveler') {
        navigate('/agency')
      } else {
        setLoginError(false)
      }
    }
  };

  const validateUsername = (username) => {
    const regex = /^(traveler([1-9]|[1-4][0-9]|50)|agency)$/; // Regex to match "traveler" followed by 1-50 or "agency"
    return regex.test(username);
  };

  const getUserId = (username) => {
    const userId = username.slice(8);
    return parseInt(userId);
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type='text'
              value={userName}
              onChange={handleUserNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='text'
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type='submit'>Submit</button>
        <div hidden={loginError}>Username or password incorrect</div>
      </form>
    </div>
  );
};
