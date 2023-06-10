import React, { MouseEvent, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

import { closeMenu, toggleMenu } from 'reducers/slideMenu'; // closeMenu 액션도 import 합니다.
import useHideOnClickOutside from 'hooks/useHideOnClickOutside'; // 외부 클릭 시 메뉴를 닫는 훅을 import 합니다.

import styles from './header.module.scss';
import logo from 'assets/elice-logo.png';
import menu from 'assets/menu.svg';
import { Link } from 'react-router-dom';
import HeaderSlideMenu from '../HeaderSlideMenu';

/**
 * Header 컴포넌트는 화면 상단에 헤더를 나타냅니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const Header = (): React.ReactElement => {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();

  const buttonRef = useRef<HTMLButtonElement>(null); // 메뉴를 여는 버튼에 대한 참조를 생성합니다.
  const { ref } = useHideOnClickOutside(() => dispatch(closeMenu()), buttonRef); // 메뉴 외부 클릭 시 메뉴를 닫습니다.

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleMenu());
  };

  useEffect(() => {}, [isOpen]);

  return (
    <>
      {isOpen === true ? (
        <div className={styles.modalBackDrop} />
      ) : (
        <div className={styles.modalBackDropHidden} />
      )}
      <header className={styles.LayoutNav} ref={ref}>
        <Link to='/'>
          <img src={logo} alt='엘리스 로고' />
        </Link>
        <button ref={buttonRef} onClick={handleClick}>
          <img src={menu} alt='메뉴' />
        </button>
      </header>
      <HeaderSlideMenu />
    </>
  );
};

export default Header;
