import { NavLink } from 'react-router-dom';
import './travelerNavBar.css';
import logo from '../../assets/logo.png';
import { useDispatch } from 'react-redux';
import menu from '../../assets/menu.svg';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
export const TravelerNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const clearCurrentUser = () => {
    dispatch(clearCurrentUser());
  };

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
      <div className='hamburger-menu'>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuClick}
        >
          <img src={menu} alt='menu' className='menu-button' />
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            {' '}
            <NavLink
              to='/home'
              className={({ isActive }) =>
                isActive ? 'active-link' : 'inactive-link'
              }
            >
              Home
            </NavLink>
          </MenuItem>
          <MenuItem>
            {' '}
            <NavLink
              to='/book'
              className={({ isActive }) =>
                isActive ? 'active-link' : 'inactive-link'
              }
            >
              Book a trip
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/pendingtrips'
              className={({ isActive }) =>
                isActive ? 'active-link' : 'inactive-link'
              }
            >
              Pending Trips
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to='/login' className='logout' onClick={clearCurrentUser}>
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};
