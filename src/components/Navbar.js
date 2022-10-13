function Navbar() {
  return (
    <header className='text-bg-dark'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <ul className='nav col-12 col-lg-auto me-lg-auto justify-content-left mb-md-0'>
            <li>
              <a className='nav-link px-2 text-secondary' href='/'>
                Home
              </a>
            </li>
            <li>
              <a className='nav-link px-2 text-secondary' href='/login'>
                Verify
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
