import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomLink from 'components/common/Link';
import ConfirmModal from 'components/common/ConfirmModal';
import styles from './myPage.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { logOut } from 'reducers/user';
import { logout, deleteUser } from 'actions/user';
import { openConfirmModal, closeConfirmModal } from 'reducers/modal';
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
  const [modalType, setModalType] = useState<string>('');
  const { username, course, generation, email } = useAppSelector(
    state => state.user,
  );
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickLogoutButton = () => {
    setModalType('logout');
    dispatch(openConfirmModal());
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(offline(email));
    dispatch(closeConfirmModal());
    setModalType('');
    navigate('/');
    dispatch(logout());
  };

  const onClickDeleteUserButton = () => {
    setModalType('deleteUser');
    dispatch(openConfirmModal());
  };

  const handleDeleteUser = () => {
    dispatch(logOut());
    dispatch(offline(email));
    dispatch(closeConfirmModal());
    setModalType('');
    navigate('/');
    dispatch(deleteUser());
  };

  return (
    <>
      {modalType === 'logout' && isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='로그아웃 하시겠습니까?'
          modalController={handleLogout}
        />
      )}
      {modalType === 'deleteUser' && isConfirmModalOpen && (
        <ConfirmModal
          modalMessage={`모든 계정 정보는 즉시 삭제됩니다.\n탈퇴하시겠습니까?`}
          modalController={handleDeleteUser}
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
          <button
            className={styles.deleteUserBtn}
            onClick={onClickDeleteUserButton}
          >
            회원 탈퇴
          </button>
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
        <div className={styles.userAccessBtnContainer}>
          <button className={styles.logoutBtn} onClick={onClickLogoutButton}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}
export default MyPage;
