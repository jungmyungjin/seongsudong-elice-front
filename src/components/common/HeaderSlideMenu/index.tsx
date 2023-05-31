import React from 'react';
import styles from './HeaderSlideMenu.module.scss';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

/**
 * 메뉴 버튼 눌렀을 시 나오는 슬라이드 메뉴 입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const HeaderSlideMenu = (): React.ReactElement => {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);

  return (
    <div
      className={`${styles.SlideMenu} ${isOpen ? styles.open : styles.close}`}
    >
      <Profile />
      <ul>
        <li>예약하기</li>
        <li>공지사항</li>
        <li>자유게시판</li>
        <li>찾아오시는 길</li>
        <li>관리자 1:1 문의</li>
      </ul>
    </div>
  );
};

export default HeaderSlideMenu;
