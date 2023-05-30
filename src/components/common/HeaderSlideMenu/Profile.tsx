import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from 'reducers/slideMenu';

import styles from './profile.module.scss';
import X from 'assets/X.svg';
import arrow from 'assets/arrow-right.svg';
import Logout from 'assets/bold-Logout.svg';

/**
 * 사용자가 로그인 된 경우 보여주는 컴포넌트입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const LoggedInProfile = (): React.ReactElement => {
  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileImage}></div>

      <div className={styles.ProfileInfo}>
        <span>[SW/4]</span>
        <span>정명진</span>
      </div>
    </div>
  );
};

/**
 * 사용자가 로그인 되지 않은 경우 보여주는 컴포넌트 입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const ToLogIn = (): React.ReactElement => {
  return (
    <div className={styles.Profile}>
      <button className={styles.ToLogInButton}>
        <span className={styles.ToLogInSpan}>로그인하러가기</span>{' '}
        <img className={styles.arrow} src={arrow} alt='->' />
      </button>
    </div>
  );
};

/**
 * 메뉴 버튼 눌렀을 시 나오는 슬라이드 메뉴 입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const Profile = (): React.ReactElement => {
  let isLogined = true;
  const dispatch = useDispatch();

  return (
    <div className={styles.LayoutProfile}>
      <div className={styles.ButtonBar}>
        <button onClick={() => dispatch(toggleMenu())}>
          <img className={styles.ButtonX} src={X} alt='X' />
        </button>
        {isLogined && (
          <img src={Logout} className={styles.ButtonLogout} alt='Logout' />
        )}
      </div>
      {isLogined ? <LoggedInProfile /> : <ToLogIn />}
    </div>
  );
};

export default Profile;
