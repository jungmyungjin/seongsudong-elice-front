import React, { useEffect, useState, useRef } from 'react';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import { convertDate } from 'utils/convertDate';
import styles from './chatModal.module.scss';
interface Message {
  chatFromMe: boolean;
  chatMessage: string;
  fromName?: string;
}

function ChatModal() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // 임의 ~> 추후 로그인하고 res값으로 받은 admin boolean값 전역에 저장해주세요
  const [isOnline, setIsOnline] = useState<boolean>(true); // 임의 ~> 채팅 페이지에 머물러 있을 때 vs 로그인 했을 때 vs 사이트 창에 머물러 있을 때  기준 정해야함
  const [inputValue, setInputValue] = useState<string>('');
  const [chatMsg, setChatMsg] = useState<Message[]>([]);
  const [date, setDate] = useState<string>('');
  const now = new Date();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // console.log(myMsg);
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatMsg]);

  useEffect(() => {
    setDate(convertDate(now));
  }, []);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      const newOtherChat = {
        chatFromMe: false,
        chatMessage: '무엇을 도와드릴까욧?',
        fromName: '성수동 소방관',
      };
      setChatMsg(prevChatMsg => [...prevChatMsg, newOtherChat]);
      count++;

      if (count === 3) {
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
      };
      setChatMsg(prevChatMsg => [...prevChatMsg, newMyChat]);

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
    <FullModal title='1:1 문의 채팅방' modalType='chat'>
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
