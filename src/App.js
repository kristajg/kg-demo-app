// 3rd party libraries
import { Routes, Route } from 'react-router-dom';

// Containers
import Home from './containers/Home';
import Messaging from './containers/Messaging';
import Navbar from './components/Navbar';
import Verify from './containers/Verify';
import Voice from './containers/Voice';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/voice' element={<Voice />} />
        <Route path='/messaging' element={<Messaging />} />
      </Routes>
    </div>
  );
}

export default App;
