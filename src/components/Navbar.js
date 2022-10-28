import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkBaseClasses = 'nav-link px-2 text-secondary';
  const linkStyles = isActive => {
    return isActive ? `text-light ${linkBaseClasses}` : linkBaseClasses;
  }

  return (
    <header className='text-bg-dark'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <ul className='nav col-12 col-lg-auto me-lg-auto justify-content-left mb-md-0'>
            <li>
              <NavLink
                className={({ isActive }) => linkStyles(isActive)}
                to='/'
                end
              >
                Home
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
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
