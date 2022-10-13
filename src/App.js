// 3rd party libraries
import { Routes, Route } from 'react-router-dom';

// Containers
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Login from './containers/Login';

// Helpers
import { sendMessage } from './helpers/apiHelpers';

// sendMessage('test wowie zowie!!', '+17242726172', '+17372378885')
// .then(data => {
//   console.log('data in frontend ', data);
// })
// sendMMS('its a cat', to, from, 'https://bit.ly/33YrW28'); 

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
