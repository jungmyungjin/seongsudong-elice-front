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
      {chatFromMe ? (
        <div className={styles.containerFromMe}>
          <div className={styles.contentContainerFromMe}>
            <div className={styles.chatFromMe}>{chatMessage}</div>
            <div className={styles.chatTimeFromMe}>{time}</div>
          </div>
        </div>
      ) : (
        <div className={styles.containerFromOther}>
          <div className={styles.imgContainer}>
            <img src='/images/rabbit.png' alt='profile' />
          </div>
          <div className={styles.contentContainerFromOther}>
            <div className={styles.chatName}>{fromName}</div>
            <div className={styles.contentFromOther}>
              <div className={styles.chatFromOther}>{chatMessage}</div>
              <div className={styles.chatTimeFromOther}>{time}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
