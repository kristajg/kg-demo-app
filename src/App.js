// 3rd party libraries
import { Routes, Route } from 'react-router-dom';

// Containers
import Home from './containers/Home';
import Messaging from './containers/Messaging';
import Verify from './containers/Verify';
import { Voice } from './containers/Voice';

// Components
import Navbar from './components/Navbar';
import PlaceCall from './components/voice/placecall/index.js';
import IVR from './components/voice/IVR';
import PowerDialer from './components/voice/PowerDialer';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='verify' element={<Verify />} />
        <Route path='voice' element={<Voice />}>
          <Route path='' element={<PlaceCall />} />
          <Route path='ivr' element={<IVR />} />
          <Route path='powerdialer' element={<PowerDialer />} />
        </Route>
        <Route path='messaging' element={<Messaging />} />
      </Routes>
    </div>
  );
}

export default App;
