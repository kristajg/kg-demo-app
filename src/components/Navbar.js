import { NavLink } from 'react-router-dom';

import twilioLogoWhite from '../assets/images/logos/logo-twilio-mark-white.png';

function Navbar() {
  const linkBaseClasses = 'nav-link px-2 inactive-nav-link';
  const linkStyles = isActive => isActive ? `text-light ${linkBaseClasses}` : linkBaseClasses;

  return (
    <header className='header-style'>
      <div className='container ms-0'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <NavLink to='/'>
            <img src={twilioLogoWhite} style={{ maxWidth: '50px' }} alt='twilio logo' />
          </NavLink>
          <ul className='nav col-12 col-lg-auto me-lg-auto justify-content-left mb-md-0'>
            <li>
              <NavLink
                className={({ isActive }) => linkStyles(isActive)}
                to='/'
                end
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => linkStyles(isActive)}
                to='messaging'
              >
                Messaging
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => linkStyles(isActive)}
                to='voice'
              >
                Voice
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => linkStyles(isActive)}
                to='verify'
              >
                Verify
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => linkStyles(isActive)}
                to='lookup'
              >
                Lookup
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => linkStyles(isActive)}
                to='phonenumbers'
              >
                Phone Numbers
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
