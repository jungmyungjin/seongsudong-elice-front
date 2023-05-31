import React, { useEffect, useState } from 'react';
import styles from './chatMessage.module.scss';

import { convertDate } from 'utils/convertDate';

interface ChatMessageProps {
  // key: number;
  chatFromMe: boolean; // true
  chatMessage: string;
  fromName?: string; // 내가 보낸 메세지면 이름이 없어도 됨
}
function ChatMessage({
  // key,
  chatFromMe,
  chatMessage,
  fromName,
}: ChatMessageProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [date, setDate] = useState<string>('');
  const now = new Date();
  const time = `${date.split(' ')[4]} ${date.split(' ')[5]}`; // 오전 1:11

  useEffect(() => {
    setDate(convertDate(now));
  }, [date]);

  return (
    <>
      <div
        className={
          chatFromMe
            ? styles.chatMessageContainerFromMe
            : styles.chatMessageContainerFromOther
        }
      >
        {!chatFromMe ? (
          <div className={styles.profile}>
            <div className={styles.chatProfileImgContainer}>
              <img src='/images/rabbit.png' alt='profile' />
            </div>
            <div className={styles.chatName}>{fromName}</div>
          </div>
        ) : (
          ''
        )}
        <div
          className={
            chatFromMe
              ? styles.chatMessageContentFromMe
              : styles.chatMessageContentFromOther
          }
        >
          <div
            className={chatFromMe ? styles.chatFromMe : styles.chatFromOther}
          >
            <div className={styles.ChatMessage}>{chatMessage}</div>
          </div>
          <div
            className={
              chatFromMe ? styles.chatTimeFromMe : styles.chatTimeFromOther
            }
          >
            {time}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
