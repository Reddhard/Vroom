//import axios from 'axios';
//import { useEffect,useState } from 'react';
import { Route, Routes } from 'react-router'
import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AboutUs } from './pages/AboutUs';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { PersonalInfo } from './pages/PersonalInfo';
import { VehicleInfo } from './pages/VehicleInfo';
import { RegisterVh } from './pages/RegisterVh';
import { RideHistory } from './pages/RideHistory';
import { RequestHistory } from './pages/RequestHistory';
import { PostRide } from './pages/PostRide';
import { ConfirmRide } from './pages/ConfirmRide';
import { TrackRide } from './pages/TrackRide';
import { FindRide } from './pages/FindRide';
import { Rating } from './pages/Rating';
import { GivenRating } from './pages/GivenRating';
import { ReceivedRating } from './pages/ReceivedRating';

function App() {

  // const [latestride,setLatestride] = useState([]);

  // useEffect(() => {
  //   //2-3 latest homepage rides
  //   axios.get('/api/latestride')
  //     .then(response => {
  //       console.log('Backend is reachable:', response.data);
  //       setLatestride(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error connecting to backend:', error);
  //     });
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/findride" element={<FindRide />} />


      <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      <Route path="/personalinfo" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
      <Route path="/vehicleinfo" element={<ProtectedRoute><VehicleInfo /></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute><RegisterVh /></ProtectedRoute>} />
      <Route path="/allrides" element={<ProtectedRoute><RideHistory /></ProtectedRoute>} />
      <Route path="/allrequests" element={<ProtectedRoute><RequestHistory /></ProtectedRoute>} />
      <Route path="/postride" element={<ProtectedRoute><PostRide /></ProtectedRoute>} />
      <Route path="/track" element={<ProtectedRoute><TrackRide /></ProtectedRoute>} />
      <Route path="/confirm" element={<ProtectedRoute><ConfirmRide /></ProtectedRoute>} />
      <Route path="/rating" element={<ProtectedRoute><Rating /></ProtectedRoute>} />
      <Route path="/givenrating" element={<ProtectedRoute><GivenRating /></ProtectedRoute>} />
      <Route path="/receivedrating" element={<ProtectedRoute><ReceivedRating /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
