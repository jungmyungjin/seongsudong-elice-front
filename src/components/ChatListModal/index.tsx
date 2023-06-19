import React, { useEffect, useMemo } from 'react';
import { ReactComponent as Chat } from 'assets/Chat.svg';
import styles from './chatListModal.module.scss';
import darkStyles from './chatListModalDark.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import ChatModal from 'components/ChatModal';
import ChatList from 'components/ChatList';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

function ChatListModal() {
  const { isChatModalOpen } = useAppSelector(state => state.modal);

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <>
      {isChatModalOpen ?? <ChatModal />}
      <FullModal title='레이서 문의 관리' modalType='adminChatListModal'>
        <div className={selectedStyles.chatListModalWrapper}>
          <div className={selectedStyles.headerContainer}>
            <div className={selectedStyles.iconBox}>
              <Chat />
            </div>
            <span className={selectedStyles.titleText}>
              레이서 문의 채팅 리스트
            </span>
          </div>
          <section className={selectedStyles.chatList}>
            <ChatList />
          </section>
        </div>
      </FullModal>
    </>
  );
}

export default ChatListModal;
