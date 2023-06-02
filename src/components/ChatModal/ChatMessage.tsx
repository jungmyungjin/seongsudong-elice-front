import React, { useEffect, useState } from 'react';
import styles from './chatMessage.module.scss';
import { IChatMessage } from 'types/chat';
import { convertDate } from 'utils/convertDate';

function ChatMessage({
  chatFromMe,
  chatMessage,
  fromName,
  isOnline,
}: IChatMessage) {
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
            <div className={isOnline ? styles.isOnline : ''} />
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
