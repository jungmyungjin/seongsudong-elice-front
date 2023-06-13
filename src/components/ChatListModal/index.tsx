import React, { useEffect } from 'react';
import { ReactComponent as Chat } from 'assets/Chat.svg';
import styles from './chatListModal.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import ChatModal from 'components/ChatModal';
import ChatList from 'components/ChatList';

function ChatListModal() {
  const { isChatModalOpen } = useAppSelector(state => state.modal);

  return (
    <>
      {isChatModalOpen ?? <ChatModal />}
      <FullModal title='레이서 문의 관리' modalType='adminChatListModal'>
        <div className={styles.chatListModalWrapper}>
          <div className={styles.headerContainer}>
            <div className={styles.iconBox}>
              <Chat />
            </div>
            <span className={styles.titleText}>레이서 문의 채팅 리스트</span>
          </div>
          <section className={styles.chatList}>
            <ChatList />
          </section>
        </div>
      </FullModal>
    </>
  );
}

export default ChatListModal;
