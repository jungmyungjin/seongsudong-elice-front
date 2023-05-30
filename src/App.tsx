import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';

import Main from './pages/Main';
import Admin from 'pages/Admin/Admin';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
