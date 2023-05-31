import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from 'reducers/slideMenu';

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
  const dispatch = useDispatch();
  return (
    <>
      <header className={styles.LayoutNav}>
        <Link to='/'>
          <img src={logo} alt='엘리스 로고' />
        </Link>
        <button onClick={() => dispatch(toggleMenu())}>
          <img src={menu} alt='메뉴' />
        </button>
      </header>
      <HeaderSlideMenu />
    </>
  );
};

export default Header;
