// 3rd party libraries
import { Routes, Route } from 'react-router-dom';

// Containers
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Login from './containers/Login';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
