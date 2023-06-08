import React, { useState, useEffect } from 'react';
import styles from './HeaderSlideMenu.module.scss';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/configureStore';
import { closeMenu } from 'reducers/slideMenu'; // 메뉴를 닫는 액션을 import합니다.

import useHideOnClickOutside from 'hooks/useHideOnClickOutside';

/**
 * 메뉴 버튼 눌렀을 시 나오는 슬라이드 메뉴 입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const HeaderSlideMenu = (): React.ReactElement => {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const { ref } = useHideOnClickOutside(() => dispatch(closeMenu()));

  let navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    dispatch(closeMenu());
  };

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen === false) {
      dispatch(closeMenu());
    }
  }, [isOpen, dispatch, isVisible]);

  return (
    <div
      ref={ref}
      className={`${styles.SlideMenu} ${
        isVisible ? styles.open : styles.close
      }`}
    >
      <Profile />
      <ul>
        <li>
          <button onClick={() => handleClick('/admin')}>
            <span>관리자페이지</span>
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('/mypage')}>
            <span>마이페이지</span>
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('/reservation')}>
            <span>예약하기</span>
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('/post/free')}>
            <span>공지사항</span>
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('/post/free')}>
            <span>자유게시판</span>
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('/')}>
            <span>찾아오시는 길</span>
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('/')}>
            <span>관리자 1:1 문의</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderSlideMenu;
