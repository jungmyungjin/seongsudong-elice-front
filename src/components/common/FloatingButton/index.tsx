import Draggable, { DraggableData } from 'react-draggable';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openChatModal } from 'reducers/modal';
import ChatModal from 'components/ChatModal';
import styles from './floatingButton.module.scss';

function FloatingButton() {
  const { isChatModalOpen } = useAppSelector(state => state.modal);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleOpenChatModal = () => {
    dispatch(openChatModal());
  };

  const handleOnDrag = (data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  useEffect(() => {
    if (
      location.pathname === '/post/create' ||
      location.pathname === '/reservation'
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
        <Draggable
          position={{ x: position.x, y: position.y }}
          onDrag={(_, data) => handleOnDrag(data)}
        >
          <div className={styles.floatingButtonContainer}>
            <button
              className={styles.floatingButton}
              onDoubleClick={handleOpenChatModal}
            >
              <div className={styles.rabbitIcon}>
                <img src='/images/rabbit.png' alt='rabbit-icon' />
              </div>
              <div className={styles.floatingButtonText}>문의하기</div>
            </button>
          </div>
        </Draggable>
      )}
    </>
  );
}

export default FloatingButton;
