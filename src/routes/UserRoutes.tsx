import React from 'react';
import axios from 'axios';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/configureStore';
import { closeMenu } from 'reducers/slideMenu';
import { logOut } from 'reducers/user';
import { useAppDispatch } from 'hooks/useRedux';
import { offline } from 'actions/access';

// 로그인 유저만 접근 가능
const UserRoutes = () => {
  const dispatch = useDispatch();
  const offLineDispatch = useAppDispatch();
  const email = useSelector((state: RootState) => state.user.email);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const handleLogoutClick = async () => {
    try {
      // 사용자 정보 확인
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/access/loginUser`,
        { withCredentials: true },
      );
      // 유효하지 않은 액세스토큰 or 쿠키가 만료되어 없는 경우
      if (response.status === 204) {
        const apiLogout =
          process.env.REACT_APP_BACKEND_ADDRESS + '/members/logout';
        dispatch(logOut());
        dispatch(closeMenu());
        if (email) {
          await offLineDispatch(offline(email)).unwrap();
        }
        await axios.delete(apiLogout, {
          withCredentials: true,
        });
        return <Navigate to='/login' />;
      }
    } catch (error) {
      console.log('Login Denied Error:', error);
      dispatch(logOut());
      dispatch(closeMenu());
      if (email) {
        await offLineDispatch(offline(email)).unwrap();
      }
    }
  };
  handleLogoutClick();

  if (!loggedIn) {
    return <Navigate to='/login' />;
  }

  return loggedIn && <Outlet />;
};

export default UserRoutes;
