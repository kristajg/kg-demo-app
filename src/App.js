// 3rd party libraries
import { Routes, Route } from 'react-router-dom';

// Containers
import Home from './containers/Home';
import Lookup from './containers/Lookup';
import Messaging from './containers/Messaging';
import { PhoneNumbers } from './containers/PhoneNumbers';
import Verify from './containers/Verify';
import { Voice } from './containers/Voice';

// Components
import Navbar from './components/Navbar';
import PlaceCall from './components/Voice/placecall/index.js';
import IVR from './components/Voice/IVR';
import PowerDialer from './components/Voice/PowerDialer';
import A2P10DLC from './components/PhoneNumbers/a2p10dlc/index.js';
import TollFree from './components/PhoneNumbers/tollfree/index.js';
import NumberPurchase from './components/PhoneNumbers/purchase/index.js';

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
        <Route path='lookup' element={<Lookup />} />
        <Route path='phonenumbers' element={<PhoneNumbers />}>
          <Route path='' element={<TollFree />} />
          <Route path='number-purchase' element={<NumberPurchase />} />
          <Route path='a2p-10dlc' element={<A2P10DLC />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
