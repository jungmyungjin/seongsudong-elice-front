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
