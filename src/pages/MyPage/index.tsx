import { useNavigate } from 'react-router-dom';
import CustomLink from 'components/common/Link';
import ConfirmModal from 'components/common/ConfirmModal';

import styles from './myPage.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { logOut } from 'reducers/user';
import { logout } from 'actions/user';
import {
  openLogOuttModal,
  closeLogOutModal,
  openDeleteAccoutModal,
  closeDeleteAccoutModal,
} from 'reducers/modal';
import { offline } from 'actions/access';

const myPageMenu = [
  {
    id: 1,
    to: 'myreservation',
    icon: 'calendar',
    title: '예약 조회',
    right: true,
  },
  {
    id: 2,
    to: 'mypost',
    icon: 'post',
    title: '내가 쓴 게시물',
    right: true,
  },
];

function MyPage() {
  const { username, course, generation, email } = useAppSelector(
    state => state.user,
  );
  const { isLogOutModalOpen, isDeleteAccoutModalOpen } = useAppSelector(
    state => state.modal,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Login
  const handleNextLogout = () => {
    dispatch(logOut());
    dispatch(offline(email));
    dispatch(closeLogOutModal());
    navigate('/');
    dispatch(logout());
  };
  const handlePrevLogout = () => {
    dispatch(closeLogOutModal());
  };
  const onClickLogoutButton = () => {
    dispatch(openLogOuttModal());
  };

  // DeleteAccount
  const handleNextDeleteAccout = () => {
    // 회원 삭제 API 추가
    console.log('사용자 삭제 API');
    // 로그아웃 적용
    console.log('로그아웃 적용');

    dispatch(closeDeleteAccoutModal());
  };
  const onClickDeleteAccount = () => {
    dispatch(openDeleteAccoutModal());
  };
  const handlePrevDeleteAccout = () => {
    dispatch(closeDeleteAccoutModal());
  };

  return (
    <>
      {isLogOutModalOpen && (
        <ConfirmModal
          isOpen={isLogOutModalOpen}
          type='LogOut'
          modalMessage='로그아웃 하시겠습니까?'
          modalController={handleNextLogout}
          closeController={handlePrevLogout}
        />
      )}
      {isDeleteAccoutModalOpen && (
        <ConfirmModal
          isOpen={isDeleteAccoutModalOpen}
          type='DeleteAccout'
          modalMessage='회원 탈퇴를 하시겠습니까?'
          modalSubMessages={[
            '회원 탈퇴시 복구가 불가능 하며,',
            '작성하신 모든 게시물 및 댓글이 삭제됩니다.',
          ]}
          modalController={handleNextDeleteAccout}
          closeController={handlePrevDeleteAccout}
        />
      )}
      <div className={styles.myPageContainer}>
        <div className={styles.header}>
          <div className={styles.headerImage}>
            <img src='/images/rabbit_profile.png' alt='profile' />
          </div>
          <div className={styles.myName}>
            [{course}/{generation}] {username}
          </div>
        </div>
        <div className={styles.myPageMenuContainer}>
          {myPageMenu.map(item => (
            <CustomLink
              key={item.id}
              to={item.to}
              title={item.title}
              icon={item.icon}
              right={item.right}
            />
          ))}
        </div>
        <div className={styles.logoutBtnContainer}>
          <button className={styles.logoutBtn} onClick={onClickLogoutButton}>
            로그아웃
          </button>
        </div>
        <div className={styles.logoutBtnContainer}>
          <button className={styles.logoutBtn} onClick={onClickDeleteAccount}>
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  );
}
export default MyPage;
