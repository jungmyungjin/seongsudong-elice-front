import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomLink from 'components/common/Link';
import ConfirmModal from 'components/common/ConfirmModal';
import styles from './myPage.module.scss';
import darkStyles from './myPageDark.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { logOut } from 'reducers/user';
import { logout, deleteUser } from 'actions/user';
import { openConfirmModal, closeConfirmModal } from 'reducers/modal';
import { offline } from 'actions/access';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

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

  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const { username, course, generation, email } = useAppSelector(
    state => state.user,
  );
  const { logoutDone, logoutError, deleteUserDone, deleteUserError, isAdmin } =
    useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickLogoutButton = () => {
    setModalType('logout');
    dispatch(openConfirmModal());
  };

  const onClickDeleteUserButton = () => {
    setModalType('deleteUser');
    dispatch(openConfirmModal());
  };

  const handleLogout = async () => {
    dispatch(offline(email));
    dispatch(closeConfirmModal());
    setModalType('');

    try {
      await dispatch(logout()).unwrap();
      dispatch(logOut());
      navigate('/');
    } catch (error) {
      setModalType('logoutAlert');
      dispatch(openConfirmModal());
    }
  };

  const handleDeleteUser = async () => {
    dispatch(offline(email));
    dispatch(closeConfirmModal());
    setModalType('');
    try {
      await dispatch(deleteUser(email)).unwrap();
      dispatch(logOut());
      navigate('/');
    } catch (error) {
      setModalType('deleteUserAlert');
      dispatch(openConfirmModal());
    }
  };

  const handleClose = () => {
    dispatch(closeConfirmModal());
  };

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

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
      {logoutError && modalType === 'logoutAlert' && isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='로그아웃 중에 오류가 발생했습니다.'
          modalController={handleClose}
        />
      )}
      {deleteUserError &&
        modalType === 'deleteUserAlert' &&
        isConfirmModalOpen && (
          <ConfirmModal
            modalMessage='탈퇴 중에 오류가 발생했습니다.'
            modalController={handleClose}
          />
        )}
      <div className={styles.myPageContainer}>
        <div className={styles.header}>
          <div className={styles.headerImage}>
            <img src='/images/rabbit_profile.png' alt='profile' />
          </div>

          {isAdmin && (
            <>
              <div className={styles.myName}>{username}</div>
            </>
          )}
          {!isAdmin && (
            <>
              <div className={styles.myName}>
                [{course}/{generation}] {username}
              </div>
            </>
          )}

          <button
            className={selectedStyles.deleteUserBtn}
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
          <button
            className={selectedStyles.logoutBtn}
            onClick={onClickLogoutButton}
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}
export default MyPage;
