import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';

import Main from './pages/Main';
import FloatingButton from 'components/common/FloatingButton';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
      <FloatingButton />
    </div>
  );
}

export default App;
