import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import { addChat } from 'reducers/chat';

import { convertDate } from 'utils/convertDate';
import styles from './chatModal.module.scss';

function ChatModal() {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // 임의 ~> 추후 로그인하고 res값으로 받은 admin boolean값 전역에 저장해주세요
  const [isOnline, setIsOnline] = useState<boolean>(true); // 임의 ~> 채팅 페이지에 머물러 있을 때 vs 로그인 했을 때 vs 사이트 창에 머물러 있을 때  기준 정해야함
  const [inputValue, setInputValue] = useState<string>('');
  const [date, setDate] = useState<string>('');

  /** 채팅 각 하나의 시간 */
  const now = new Date();
  const nowDate = convertDate(now);
  const time = `${nowDate.split(' ')[4]} ${nowDate.split(' ')[5]}`; // 오전 1:11

  const dispatch = useAppDispatch();
  const chatMsg = useAppSelector(state => state.chat.chatList);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  /** 자동 스크롤 */
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatMsg]);

  /** 채팅방 첫 입성시 위에 제목, 날짜 결정 */
  useEffect(() => {
    setDate(convertDate(now));
    /** 전역으로 관리되는 유저 정보 가져와서 분기 실행 */
    if (isAdmin) setModalTitle('[SW]신하영');
    else setModalTitle('1:1 문의 채팅방');
  }, []);

  /** 임의로 보내는 것 -> socket 연결되면 지워라 */
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      const newOtherChat = {
        chatFromMe: false,
        chatMessage: '무엇을 도와드릴까욧?',
        fromName: '성수동 소방관',
        isOnline: true,
        sentTime: time,
      };

      dispatch(addChat(newOtherChat));
      count++;

      if (count === 5) {
        clearInterval(interval);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleSend() {
    if (inputValue.trim() !== '') {
      const newMyChat = {
        chatFromMe: true,
        chatMessage: inputValue,
        sentTime: time,
      };
      dispatch(addChat(newMyChat));

      setInputValue('');
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <FullModal title={modalTitle} modalType='chat'>
      <div className={styles.chatModalContainer}>
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          {!isAdmin && <AdminProfile isOnline={isOnline} />}
          <div className={styles.nowDate}>{date}</div>
          <div className={styles.chatListContainer}>
            {chatMsg.map((msg, i) => (
              <ChatMessage
                key={i}
                chatFromMe={msg.chatFromMe}
                chatMessage={msg.chatMessage}
                fromName={msg.fromName}
                isOnline={msg.isOnline}
                sentTime={msg.sentTime}
              />
            ))}
          </div>
        </div>
        <div className={styles.chatInputContainer}>
          <ChatInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleClick={handleSend}
            handleEnter={handleEnter}
          />
        </div>
      </div>
    </FullModal>
  );
}

export default ChatModal;
