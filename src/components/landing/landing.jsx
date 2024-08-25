import { Link } from 'react-router-dom';
import landing from '../../assets/landing.png';
import logo from '../../assets/logo.png';
import './landing.css';
export const Landing = () => {
  return (
    <div className='landing'>
      <img
        src={landing}
        alt="Image of palm trees with the text Let's Explore the World Book trips and explore new destinations with ease from anywhere"
        className='landing-background'
      />
      <nav>
        <div>
          <img src={logo} alt='logo' />
          <h1>Hortizuela Travel</h1>
        </div>
        <button className="login">
          <Link to='/login'>Login</Link>
        </button>
      </nav>
    </div>
  );
};
