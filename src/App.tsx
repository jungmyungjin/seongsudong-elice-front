import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Board from './components/Board/Board';
import PostsDetail from './components/Board/PostsDetail';
import CreatePost from './components/Board/CreatePost';
import Main from './pages/Main';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Board/>} />
          <Route path="/post/:id" element={<PostsDetail />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
