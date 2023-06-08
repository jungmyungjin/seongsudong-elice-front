import React, { useEffect } from 'react';
import { ReactComponent as Chat } from 'assets/Chat.svg';
import styles from './chatListModal.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
// import { openChatModal } from 'reducers/modal';
// import { setChatRoomDetail } from 'actions/chat';

import FullModal from '../common/FullModal';
import ChatModal from 'components/ChatModal';
import ChatList from 'components/ChatList';

// const dummyList = [
//   {
//     roomId: 1,
//     memberName: '카리나',
//     adminEmail: 'shy8957@naver.com',
//     memberEmail: 'test1@test.com',
//     createAt: '2018-05-27',
//     lastSendTime: '오후 2:00',
//     lastSendMsg: '모든 걸 삼켜버릴 블랙맘바',
//   },
//   {
//     roomId: 2,
//     memberName: '윈터',
//     adminEmail: 'shy8957@naver.com',
//     memberEmail: 'test2@test.com',
//     createAt: '2019-04-23',
//     lastSendTime: '오전 10:00',
//     lastSendMsg: '커즈 암 투 스파이시 뿰 유어 허트',
//   },
//   {
//     roomId: 3,
//     memberName: '닝닝',
//     adminEmail: 'shy8957@naver.com',
//     memberEmail: 'test3@test.com',
//     createAt: '2020-09-18',
//     lastSendTime: '오후 10:00',
//     lastSendMsg: '김미김미나 김미김미나 쯔쯔쯔쯔',
//   },
//   {
//     roomId: 4,
//     memberName: '지젤',
//     adminEmail: 'shy8957@naver.com',
//     memberEmail: 'test4@test.com',
//     createAt: '2021-03-21',
//     lastSendTime: '오후 06:00',
//     lastSendMsg: '암온더 넥스트 레븰 예',
//   },
// ];

function ChatListModal() {
  const { isChatModalOpen } = useAppSelector(state => state.modal);
  const { chatRoomDetail } = useAppSelector(state => state.chat);
  // const dispatch = useAppDispatch();

  // const handleChatModalOpen = (id: number) => {
  //   const selectOneChat = dummyList.find(item => item.roomId === id);
  //   if (selectOneChat) dispatch(setChatRoomDetail(selectOneChat));
  //   dispatch(openChatModal());
  // };

  useEffect(() => {
    console.log(chatRoomDetail);
  }, [chatRoomDetail]);

  return (
    <>
      {isChatModalOpen ?? <ChatModal />}
      <FullModal title='레이서 문의 관리' modalType='adminChatListModal'>
        <div className={styles.chatListModalWrapper}>
          {/* 별로면 헤더 지워도 무관 */}
          <div className={styles.headerContainer}>
            <div className={styles.iconBox}>
              <Chat />
            </div>
            <span className={styles.titleText}>레이서 문의 채팅 리스트</span>
          </div>
          <section className={styles.chatList}>
            {/* 이 부분에 더미데이터를 지우고 채팅 리스트 요소를 반환하는 컴포넌트를 작성해주세요 */}
            {/* {dummyList.map(item => (
              <div
                key={item.roomId}
                className={styles.chatItem}
                onClick={() => handleChatModalOpen(item.roomId)}
              >
                {item.memberName} {item.lastSendMsg} {item.lastSendTime}
              </div>
            ))} */}
            <ChatList />
          </section>
        </div>
      </FullModal>
    </>
  );
}

export default ChatListModal;
