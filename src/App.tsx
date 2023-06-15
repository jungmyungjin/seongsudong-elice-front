import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import styles from './styles/index.module.scss';
import darkStyles from './styles/dark.module.scss';
import Board from './components/Board/Board';
import PostsDetail from './components/Board/PostsDetail';
import CreatePost from './components/Board/CreatePost';
import PostUpdate from './components/Board/PostUpdate';
import Reservation from 'components/Reservation';
import Main from './pages/Main2';
import FloatingButton from 'components/common/FloatingButton';
import Admin from 'pages/Admin/Admin';
import AdminBooking from 'pages/Admin/AdminBooking';
import AdminBookingRacer from 'pages/Admin/AdminBookingRacer';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MyPage from 'pages/MyPage';
import MyPost from 'pages/MyPost';
import MyReservation from 'pages/MyReservation';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import AdminNotice from 'pages/Admin/AdminNotice';
import AdminBookingBlock from 'pages/Admin/AdminBookingBlock';
import EliceDirection from 'components/Direction/Direction';
import Unvalid from 'pages/Unvalid/Unvalid';
import AdminRoutes from 'routes/AdminRoutes';
import UserRoutes from 'routes/UserRoutes';
import AlreadyLoggedInRoutes from 'routes/AlreadyLoggedInRoutes';
import { useEffect, useMemo, useState } from 'react';
import { setIsDarkMode } from 'reducers/checkMode';

function App() {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    dispatch(setIsDarkMode(darkModeQuery.matches));
    const handleChange = (event: { matches: boolean }) => {
      dispatch(setIsDarkMode(event.matches));
    };
    darkModeQuery.addEventListener('change', handleChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
    };
  }, [dispatch]);

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  useEffect(() => {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = isDarkMode ? 'dark-styles.css' : 'styles.css';
    document.head.appendChild(styleLink);

    return () => {
      document.head.removeChild(styleLink);
    };
  }, [isDarkMode]);

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
    >
      <div className={selectedStyles.AppContainer}>
        <section className={selectedStyles.App}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/post/free' element={<Board />} />
              <Route path='/direction' element={<EliceDirection />} />

              <Route element={<AlreadyLoggedInRoutes />}>
                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
              </Route>

              <Route element={<UserRoutes />}>
                <Route path='/post/free/:id' element={<PostsDetail />} />
                <Route path='/post/free/create' element={<CreatePost />} />
                <Route
                  path='/post/free/editPost/:id'
                  element={<PostUpdate />}
                />
                <Route path='/reservation' element={<Reservation />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/mypage/mypost' element={<MyPost />} />
                <Route
                  path='/mypage/myreservation'
                  element={<MyReservation />}
                />
              </Route>

              <Route element={<AdminRoutes />}>
                <Route path='/admin' element={<Admin />} />
                <Route path='/admin/booking' element={<AdminBooking />} />
                <Route
                  path='/admin/booking/racer'
                  element={<AdminBookingRacer />}
                />
                <Route
                  path='/admin/booking/block'
                  element={<AdminBookingBlock />}
                />
                <Route path='/admin/notice' element={<AdminNotice />} />
              </Route>

              <Route path='/*' element={<Unvalid />} />
            </Routes>
            <Footer />
            <FloatingButton />
          </BrowserRouter>
        </section>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
