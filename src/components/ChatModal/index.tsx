import React, { useEffect, useState, useRef } from 'react';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import { convertDate } from 'utils/convertDate';
import styles from './chatModal.module.scss';

function ChatModal() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // 임의 ~> 추후 로그인하고 res값으로 받은 admin boolean값 전역에 저장해주세요
  const [isOnline, setIsOnline] = useState<boolean>(true); // 임의 ~> 채팅 페이지에 머물러 있을 때 vs 로그인 했을 때 vs 사이트 창에 머물러 있을 때  기준 정해야함
  const [inputValue, setInputValue] = useState<string>('');
  const [myMsg, setMyMsg] = useState<string[]>([]);
  const [otherMsg, setOtherMsg] = useState<string[]>([]);
  const [chatMsg, setChatMsg] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const time = `${date.split(' ')[4]} ${date.split(' ')[5]}`; // 오전 1:11

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  console.log(myMsg);
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [myMsg, otherMsg]);

  useEffect(() => {
    setDate(convertDate());
  }, []);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setOtherMsg(prevOtherMsg => {
        const newOtherMessage = [...prevOtherMsg, '무엇을 도와드릴까욧?'];
        return newOtherMessage;
      });
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
      setMyMsg(() => {
        const newMyMessage = [...myMsg];
        newMyMessage.push(inputValue);
        return newMyMessage;
      });
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
            {otherMsg.map((msg, i) => (
              <ChatMessage
                key={i}
                chatFromMe={false}
                chatMessage={otherMsg[i]}
                chatTime={time}
                fromName='성수동 소방관'
              />
            ))}
            {myMsg.map((msg, i) => (
              <ChatMessage
                key={i}
                chatFromMe={true}
                chatMessage={myMsg[i]}
                chatTime={time}
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
