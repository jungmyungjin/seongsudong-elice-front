import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';

import Main from './pages/Main';
import FloatingButton from 'components/common/FloatingButton';
import Admin from 'pages/Admin/Admin';
import AdminBooking from 'pages/Admin/AdminBooking';
import AdminBookingRacer from 'pages/Admin/AdminBookingRacer';
import Header from './components/common/Header';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/booking' element={<AdminBooking />} />
          <Route path='/admin/booking/racer' element={<AdminBookingRacer />} />
        </Routes>
      </BrowserRouter>

      <FloatingButton />
    </div>
  );
}

export default App;
