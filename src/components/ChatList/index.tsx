import React, { useState, useEffect, useMemo } from 'react';
import Loading from '../common/Loading';

import { useAppDispatch } from 'hooks/useRedux';
import { openChatModal } from 'reducers/modal';
import { setChatRoomDetail } from 'reducers/chat';

import styles from './chatList.module.scss';
import darkStyles from './chatListDark.module.scss';
import { calculateChatDate } from 'utils/calculateChatDate';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

function ChatList() {
  const [chatList, setChatList] = useState<any>(null);

  const dispatch = useAppDispatch();

  const handleChatModalOpen = async (id: number) => {
    const selectOneChat = await chatList.find(
      (item: any) => item.room_id === id,
    );
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

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <ol className={selectedStyles.chatList}>
      {chatList === null ? (
        <Loading />
      ) : (
        chatList.map((item: any) => (
          <li
            key={item.room_id}
            className={selectedStyles.chatItem}
            onClick={() => handleChatModalOpen(item.room_id)}
          >
            <div className={selectedStyles.chatInfo}>
              <span>
                [{item.generation}] {item.name}
              </span>

              <span>{calculateChatDate(item.sentAt)}</span>
            </div>

            <div className={selectedStyles.chat}>{item.message}</div>
          </li>
        ))
      )}
    </ol>
  );
}

export default ChatList;
