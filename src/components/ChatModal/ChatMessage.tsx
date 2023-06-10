import React, { useState } from 'react';
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
  const userEmail = localStorage.getItem('email');
  if (userEmail === sender_email) {
    setChatFromMe(true);
  }
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
            {/* <div className={isOnline ? styles.isOnline : ''} /> */}
          </div>
          <div className={styles.contentContainerFromOther}>
            {/* 현재는 윤주님 이메일로 체킹중 */}
            {userEmail !== 'yunzoo0915@gmail.com' ? (
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
