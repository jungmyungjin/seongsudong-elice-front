import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Board from './components/Board/Board';
import PostsDetail from './components/Board/PostsDetail';
import CreatePost from './components/Board/CreatePost';
import Main from './pages/Main';
import FloatingButton from 'components/common/FloatingButton';
import Admin from 'pages/Admin/Admin';
import Header from './components/common/Header';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/admin' element={<Admin />} />
            <Route path="/post"  element={<Board/>} />
            <Route path="/post/:id" element={<PostsDetail />} />
            <Route path="/post/create" element={<CreatePost />} />
          </Routes>
      </BrowserRouter>
      <FloatingButton />
    </div>
  );
}

export default App;
