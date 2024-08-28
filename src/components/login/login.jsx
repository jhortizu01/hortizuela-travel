import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentTraveler,
  setTravelerTrips,
} from '../../slices/currentTravelerSlice';
import { setCurrentUser } from '../../slices/currentUserSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  useGetAllTripsQuery,
  useGetSingleTravelerQuery,
} from '../../api/apiSlice';
import './login.css';
import logo from '../../assets/logo.png';
import background from '../../assets/login.png';
export const Login = () => {
  const currentUser = useSelector((state) => state.currentUser.user);
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
      if (userName.includes('traveler') && password === 'traveler') {
        dispatch(setCurrentTraveler(getUserId(userName)));
        const trips = allTrips.trips.filter(
          (trip) => trip.userID === getUserId(userName)
        );
        dispatch(setCurrentUser('traveler'));
        dispatch(setTravelerTrips(trips));
        navigate('/home');
      } else if (userName.includes('agency') && password === 'traveler') {
        navigate('/agency');
        dispatch(setCurrentUser('agency'));
      } else {
        setLoginError(false);
      }
    }
  };

  console.log('CURRENT USER', currentUser);

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
      <div className='form'>
        <div className='logo-container'>
          <img src={logo} alt='logo' />
          <h1>
            <Link to='/'>Hortizuela Travel</Link>
          </h1>
        </div>
        <form onSubmit={handleSubmit} aria-labelledby='login-heading'>
          <div>
            <h2>Let's Sign You In</h2>
            <h3>And let the travels begin!</h3>
          </div>
          <div className='username'>
            <label>Username:</label>
            <input
              type='text'
              value={userName}
              onChange={handleUserNameChange}
              aria-required='true'
            />
          </div>
          <div className='password'>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              aria-required='true'
            />
          </div>
          <button className='signin' type='submit'>
            Submit
          </button>
          {!loginError && (
            <div role='alert' aria-live='assertive' className='error-message'>
              Username or password incorrect
            </div>
          )}{' '}
        </form>
      </div>
      <div className='loginImg'>
        <img src={background} alt='palm trees and sky' />
      </div>
    </div>
  );
};
