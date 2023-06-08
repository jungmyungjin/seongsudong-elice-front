// import Draggable, { DraggableData } from 'react-draggable';
import { useLocation } from 'react-router-dom';
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
  const [isAdmin, setIsAdmin] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleOpenChatModal = () => {
    if (isAdmin) dispatch(openChatListModal());
    else dispatch(openChatModal());
  };

  // const handleOnDrag = (data: DraggableData) => {
  //   setPosition({ x: data.x, y: data.y });
  // };

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
        // <Draggable
        //   position={{ x: position.x, y: position.y }}
        //   onDrag={(_, data) => handleOnDrag(data)}
        // >
        <div className={styles.floatingButtonContainer}>
          <button
            className={styles.floatingButton}
            onClick={handleOpenChatModal}
          >
            <div className={styles.rabbitIcon}>
              <img src='/images/rabbit.png' alt='rabbit-icon' />
            </div>
            <div className={styles.floatingButtonText}>
              {isAdmin ? '문의관리' : '문의하기'}
            </div>
          </button>
        </div>
        // </Draggable>
      )}
    </>
  );
}

export default FloatingButton;
