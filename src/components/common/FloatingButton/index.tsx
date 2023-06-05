import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openChatModal } from 'reducers/modal';
import ChatModal from 'components/ChatModal';
import styles from './floatingButton.module.scss';

function FloatingButton() {
  const { isChatModalOpen } = useAppSelector(state => state.modal);
  const [hidden, setHidden] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleOpenChatModal = () => {
    dispatch(openChatModal());
  };

  useEffect(() => {
    if (
      location.pathname === '/post/create'
      // || location.pathname === '/reservation'
    ) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [location]);

  return (
    <>
      {isChatModalOpen && <ChatModal />}
      {!hidden && (
        <div className={styles.floatingButtonContainer}>
          <button
            className={styles.floatingButton}
            onClick={handleOpenChatModal}
          >
            <div className={styles.floatingButtonText}>문의하기</div>
            <div className={styles.rabbitIcon}>
              <img src='/images/rabbit.png' alt='rabbit-icon' />
            </div>
          </button>
        </div>
      )}
    </>
  );
}

export default FloatingButton;
