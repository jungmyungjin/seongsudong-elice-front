import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

// 로그인 유저만 접근 가능
const UserRoutes = () => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  if (!loggedIn) {
    alert('로그인 유저만 접근 가능합니다.');

    return <Navigate to='/login' />;
  }

  return loggedIn && <Outlet />;
};

export default UserRoutes;
