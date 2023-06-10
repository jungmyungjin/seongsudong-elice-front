import React, { useState, useEffect } from 'react';
import styles from './chatMessage.module.scss';
import { IChatMessage } from 'types/chat';

function ChatMessage({
  sender_email,
  name,
  generation,
  message,
  sentAt,
}: IChatMessage) {
  const [chatFromMe, setChatFromMe] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  // const onlineUserList = ['test1@example.com', 'email2@gmail.com'];

  // const isOnlineFunc = () => {
  //   onlineUserList.find(user => user === sender_email) ? setIsOnline(true) : setIsOnline(false)
  // }
  useEffect(() => {
    const onlineUserList = ['test1@example.com', 'email2@gmail.com'];
    onlineUserList.find(user => user === sender_email)
      ? setIsOnline(true)
      : setIsOnline(false);

    const userEmail = localStorage.getItem('email');
    if (userEmail === sender_email) {
      setChatFromMe(true);
    } else {
      setChatFromMe(false);
    }
  }, []);
  return (
    <>
      {chatFromMe ? (
        <div className={styles.containerFromMe}>
          <div className={styles.contentContainerFromMe}>
            <div className={styles.chatFromMe}>{message}</div>
            <div className={styles.chatTimeFromMe}>{sentAt}</div>
          </div>
        </div>
      ) : (
        <div className={styles.containerFromOther}>
          <div className={styles.imgContainer}>
            <img src='/images/rabbit.png' alt='profile' />
            <div className={isOnline ? styles.isOnline : ''} />
          </div>
          <div className={styles.contentContainerFromOther}>
            {/* 현재는 윤주님 이메일로 체킹중 */}
            {sender_email !== 'yunzoo0915@gmail.com' ? (
              <div className={styles.chatName}>
                [{generation}]{name}
              </div>
            ) : (
              <div className={styles.chatName}>{name}</div>
            )}
            <div className={styles.contentFromOther}>
              <div className={styles.chatFromOther}>{message}</div>
              <div className={styles.chatTimeFromOther}>{sentAt}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
