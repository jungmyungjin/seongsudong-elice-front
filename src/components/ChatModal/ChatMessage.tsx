import React, { useState } from 'react';
import styles from './chatMessage.module.scss';

interface ChatMessageProps {
  // key: number;
  chatFromMe: boolean; // true
  chatMessage: string;
  chatTime: string; // time
  fromName?: string; // 내가 보낸 메세지면 이름이 없어도 됨
}
function ChatMessage({
  // key,
  chatFromMe,
  chatMessage,
  chatTime,
  fromName,
}: ChatMessageProps) {
  const [isOnline, setIsOnline] = useState(true);
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
            {chatTime}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
