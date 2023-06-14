import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openChatModal, openChatListModal } from 'reducers/modal';
import ChatModal from 'components/ChatModal';
import ChatListModal from 'components/ChatListModal';
import styles from './floatingButton.module.scss';

function FloatingButton() {
  const { isChatModalOpen, isChatListModalOpen } = useAppSelector(
    state => state.modal,
  );
  /* isAdmin전역 저장 성공하면 아래 주석 철회, 일단은 state로 왔다갔다 하면서 테스트 */
  // const {isAdmin} = useAppSelector(state => state.user);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = useAppSelector(state => state.user.email);

  const handleOpenChatModal = (e: any) => {
    e.stopPropagation();
    if (isDragging) return;
    if (!userEmail) {
      navigate('/login');
      return;
    }
    if (userEmail === 'elliseusobanggwan@gmail.com') {
      dispatch(openChatListModal());
    } else dispatch(openChatModal());
  };

  const handleOnDrag = (e: DraggableEvent, data: DraggableData) => {
    e.stopPropagation();
    setIsDragging(true);

    setPosition({ x: data.x, y: data.y });
  };
  const handleStopDrag = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
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
      {isChatListModalOpen && <ChatListModal />}
      {!hidden && (
        <Draggable
          position={{ x: position.x, y: position.y }}
          onDrag={(e, data) => handleOnDrag(e, data)}
          onStop={handleStopDrag}
        >
          <div className={styles.floatingButtonContainer}>
            <button
              className={styles.floatingButton}
              onClick={handleOpenChatModal}
              onTouchEnd={handleOpenChatModal}
            >
              <div className={styles.rabbitIcon}>
                <img src='/images/rabbit.png' alt='rabbit-icon' />
              </div>
              <div className={styles.floatingButtonText}>
                {userEmail === 'elliseusobanggwan@gmail.com'
                  ? '문의관리'
                  : '문의하기'}
              </div>
            </button>
          </div>
        </Draggable>
      )}
    </>
  );
}

export default FloatingButton;
