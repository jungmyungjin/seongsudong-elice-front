import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openChatModal } from 'reducers/modal';
import ChatModal from 'components/ChatModal';
import styles from './floatingButton.module.scss';

function FloatingButton() {
  const { isChatModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  const handleOpenChatModal = () => {
    dispatch(openChatModal());
  };
  /**
   * ! 추가사항
   * 관리자일 경우, 문의하기 -> 문의채팅
   * 로그인했을 때 관리자인지 아닌지에 대한 bolean값을 전역으로 저장해야함
   */

  return (
    <>
      {isChatModalOpen && <ChatModal />}
      <div className={styles.floatingButtonContainer}>
        <button className={styles.floatingButton} onClick={handleOpenChatModal}>
          <div className={styles.floatingButtonText}>문의하기</div>
          <div className={styles.rabbitIcon}>
            <img src='images/rabbit.png' alt='rabbit-icon' />
          </div>
        </button>
      </div>
    </>
  );
}

export default FloatingButton;
