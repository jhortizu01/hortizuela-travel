import { NavLink } from 'react-router-dom';
import './travelerNavBar.css';
import logo from '../../assets/logo.png';
import { useDispatch } from 'react-redux';

export const TravelerNavBar = () => {
  const dispatch = useDispatch()

  const clearCurrentUser = () => {
    dispatch(clearCurrentUser())
  }

  return (
    <header>
      <div className='logo-container'>
        <img src={logo} alt='logo' />
        <h1>
          <NavLink to='/'>Hortizuela Travel</NavLink>
        </h1>
      </div>
      <nav>
        <NavLink
          to='/home'
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/book'
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Book a trip
        </NavLink>
        <NavLink
          to='/pendingtrips'
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Pending Trips
        </NavLink>
        <NavLink to='/login' className='logout' onClick={clearCurrentUser}>
          Logout
        </NavLink>
      </nav>
    </header>
  );
};
