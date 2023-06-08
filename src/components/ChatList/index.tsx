import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openChatModal } from 'reducers/modal';
import { setChatRoomDetail } from 'actions/chat';

import styles from './chatList.module.scss';
import { calculateChatDate } from 'utils/calculateChatDate';

const dummyList = [
  {
    roomId: 1,
    memberName: '카리나[SM/4기]',
    adminEmail: 'shy8957@naver.com',
    memberEmail: 'test1@test.com',
    createAt: '2021-05-27',
    chat: {
      sentAt: '2023-06-08 10:00:00',
      lastSendMsg: '모든 걸 삼켜버릴 블랙맘바. 카리나는 신이에요.',
    },
  },
  {
    roomId: 2,
    memberName: '윈터[SM/4기]',
    adminEmail: 'shy8957@naver.com',
    memberEmail: 'test2@test.com',
    createAt: '2019-04-23',
    chat: {
      sentAt: '2023-06-07 10:00:00',
      lastSendMsg: '커즈 암 투 스파이시 뿰 유어 허트',
    },
  },
  {
    roomId: 3,
    memberName: '닝닝[SM/4기]',
    adminEmail: 'shy8957@naver.com',
    memberEmail: 'test3@test.com',
    createAt: '2020-09-18',
    chat: {
      sentAt: '2023-06-06 10:00:00',
      lastSendMsg: '김미김미나 김미김미나 쯔쯔쯔쯔',
    },
  },
  {
    roomId: 4,
    memberName: '지젤[SM/4기]',
    adminEmail: 'shy8957@naver.com',
    memberEmail: 'test4@test.com',
    createAt: '2021-03-21',
    chat: {
      sentAt: '2018-05-27 10:00:00',
      lastSendMsg: '암온더 넥스트 레븰 예',
    },
  },
];

function ChatList() {
  const [chatList, setChatList] = useState<any>([]); // 타입은 하영님이 지정해놓으신거 쓰면 될듯?

  const dispatch = useAppDispatch();

  const handleChatModalOpen = (id: number) => {
    const selectOneChat = chatList.find((item: any) => item.roomId === id);
    if (selectOneChat) dispatch(setChatRoomDetail(selectOneChat));
    dispatch(openChatModal());
  };

  useEffect(() => {
    const getChatList = async () => {
      // API 연결 전 더미
      setChatList(dummyList);

      // try {
      //   const response = await fetch(
      //     `${process.env.REACT_APP_BACKEND_ADDRESS}/`,
      //   );

      //   if (!response.ok) {
      //     throw new Error('채팅 데이터를 불러오는데 실패했습니다.');
      //   }

      //   const data = await response.json();

      //   console.log(data);

      //   setChatList(data);
      // } catch (err) {
      //   console.log(err);
      // }
    };

    getChatList();
  }, []);

  return (
    <ol className={styles.chatList}>
      {chatList.map((item: any) => (
        <li
          key={item.roomId}
          className={styles.chatItem}
          onClick={() => handleChatModalOpen(item.roomId)}
        >
          <div className={styles.chatInfo}>
            <span>{item.memberName}</span>

            {/* 만약, 가장 최신 채팅을 볼 수 있다면, 그 채팅의 시간을 보여줘야함 */}
            {/* 만약, 그 시간이 어제라면 "어제", 그저께부터는 "M월 DD일"로 표시. 년도가 달라지면 "YY.MM.DD"로 표시 */}
            {/* <span>{item.chat.sentAt}</span> */}
            <span>{calculateChatDate(item.chat.sentAt)}</span>
          </div>

          <div className={styles.chat}>{item.chat.lastSendMsg}</div>
        </li>
      ))}
    </ol>
  );
}

export default ChatList;
