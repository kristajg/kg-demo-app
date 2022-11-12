import { NavLink } from 'react-router-dom';

const styles = {
  textDecoration: 'none',
  color: 'black',
}

function Sidebar(props) {
  return (
    <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-light vh-100'>
      <ul className='nav nav-pills flex-column mb-auto'>
        {props.listItems.map((item, i) =>
          <li className='pb-3 text-dark' key={`sidebar-item-${i}`} style={{ cursor: 'pointer' }}>
            <NavLink
              to={item.route}
              style={styles}
              className={({ isActive }) => isActive ? 'text-primary' : ''}
              end={item.route === ''}
            >
              {item.name}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
