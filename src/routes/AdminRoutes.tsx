import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

// 로그인 유저 중 관리자만 접근 가능

// 이 데이터는 영속적이어야하는가? yes -> redux-persist
// 로그인 후 정보 저장 플로우
// 로그인 -> 브라우저 Storage 저장 -> dispatch -> 리덕스 스토어 저장
//
// 새로고침 후 플로우(스토어 증발)
// 브라우저 Storage 탐색 -> 해당 정보 추출 -> dispatch -> 리덕스 스토어 저장

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
