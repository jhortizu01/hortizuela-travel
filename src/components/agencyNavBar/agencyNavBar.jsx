import { NavLink } from 'react-router-dom';
import './agencyNavBar.css';
import logo from '../../assets/logo.png';
import { useDispatch } from 'react-redux';

export const AgencyNavBar = () => {
  const dispatch = useDispatch()

  const clearCurrentUser = () => {
    dispatch(clearCurrentUser())
    console.log('clicked logout')
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
          to='/agency'
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/todaystrips'
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Today's Trips
        </NavLink>
        <NavLink
          to='/finduser'
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Find User
        </NavLink>
        <NavLink to='/login' className='logout' onClick={clearCurrentUser}>
          Logout
        </NavLink>
      </nav>
    </header>
  );
};
