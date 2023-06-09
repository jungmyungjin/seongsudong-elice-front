import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

// 로그인 유저는 접근할 수 없습니다.
function AlreadyLoggedInRoutes() {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  if (loggedIn) {
    return <Navigate to='/' />;
  }

  return !loggedIn && <Outlet />;
}

export default AlreadyLoggedInRoutes;
