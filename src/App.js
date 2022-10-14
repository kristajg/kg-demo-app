// 3rd party libraries
import { Routes, Route } from 'react-router-dom';

// Containers
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Verify from './containers/Verify';
import Messaging from './containers/Messaging';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/messaging' element={<Messaging />} />
      </Routes>
    </div>
  );
}

export default App;
