import { NavLink } from 'react-router-dom';
import './agencyNavBar.css';
import logo from '../../assets/logo.png';
import { useDispatch } from 'react-redux';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import menu from '../../assets/menu.svg';
export const AgencyNavBar = () => {
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
    console.log('clicked logout');
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
              to='/agency'
              className={({ isActive }) =>
                isActive ? 'active-link' : 'inactive-link'
              }
            >
              Home
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/todaystrips'
              className={({ isActive }) =>
                isActive ? 'active-link' : 'inactive-link'
              }
            >
              Today's Trips
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/finduser'
              className={({ isActive }) =>
                isActive ? 'active-link' : 'inactive-link'
              }
            >
              Find User
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
