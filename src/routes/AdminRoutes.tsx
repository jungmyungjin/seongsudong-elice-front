import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

// 로그인 유저 중 관리자만 접근 가능
const AdminRoutes = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  if (!loggedIn) {
    alert('로그인이 필요합니다.');

    return <Navigate to='/login' />;
  }

  if (!isAdmin) {
    alert('관리자만 접근 가능합니다.');

    return <Navigate to='/' />;
  }

  return isAdmin && loggedIn && <Outlet />;
};

export default AdminRoutes;
