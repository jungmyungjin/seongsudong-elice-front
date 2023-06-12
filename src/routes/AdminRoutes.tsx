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

// 로그인 -> dispatch -> 리덕스 스토어에 유저 정보 저장 -> 열심히 사용
// 새로고침을 하면? -> 리덕스 스토어가 증발한다.
// 이 증발을 막아주는게 redux-persist
// 만약, 적용을 한다면
// 새로고침 시 -> redux-persist 작동 -> 증발 방지 -> 리덕스 스토어 정보 유지

const AdminRoutes = () => {
  // useEffect로 사용자 정보(로그인인지 판단)하는 API 통신 실행
  // 그 API는 토큰 유효성을 검증하고 만료된거라면 throw나 Res.status로 만료 정보 전달
  // 여기서 분기 처리해서
  // 하위 라우터 접근 사전에 제한
  // 으아아ㅏㅏㅏㅏㄱ

  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  console.log(loggedIn, isAdmin);

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
