import React, { useState, useEffect } from 'react';

import { useAppDispatch } from 'hooks/useRedux';
import { openChatModal } from 'reducers/modal';
import { setChatRoomDetail } from 'reducers/chat';

import styles from './chatList.module.scss';
import { calculateChatDate } from 'utils/calculateChatDate';

function ChatList() {
  const [chatList, setChatList] = useState<any>([]);

  const dispatch = useAppDispatch();

  const handleChatModalOpen = (id: number) => {
    const selectOneChat = chatList.find((item: any) => item.room_id === id);
    if (selectOneChat) dispatch(setChatRoomDetail(selectOneChat));
    dispatch(openChatModal());
  };

  useEffect(() => {
    const getChatList = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/chat`,
        );
        if (!response.ok) {
          throw new Error('채팅 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setChatList(data);
      } catch (err) {
        console.log(err);
      }
    };
    getChatList();
  }, []);

  return (
    <ol className={styles.chatList}>
      {chatList.map((item: any) => (
        <li
          key={item.room_id}
          className={styles.chatItem}
          onClick={() => handleChatModalOpen(item.room_id)}
        >
          <div className={styles.chatInfo}>
            <span>
              {item.name}[{item.generation}]
            </span>

            <span>{calculateChatDate(item.sentAt)}</span>
          </div>

          <div className={styles.chat}>{item.message}</div>
        </li>
      ))}
    </ol>
  );
}

export default ChatList;
