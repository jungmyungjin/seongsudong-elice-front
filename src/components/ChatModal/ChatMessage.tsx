import React, { useState, useEffect } from 'react';
import styles from './chatMessage.module.scss';
import { IChatMessage } from 'types/chat';
import { useAppSelector } from 'hooks/useRedux';
import useOnlineStatus from '../../hooks/useOnlineStatus';

function ChatMessage({
  sender_email,
  name,
  generation,
  message,
  sentAt,
}: IChatMessage) {
  const [chatFromMe, setChatFromMe] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const isOnline = useOnlineStatus(sender_email);

  const adminEmail = 'elliseusobanggwan@gmail.com';
  const userEmail = useAppSelector(state => state.user.email);
  const getEmailList = useAppSelector(state => state.chat.onlineList);

  useEffect(() => {
    console.log('getEmailList: ', getEmailList);
    if (userEmail === sender_email) {
      setChatFromMe(true);
    } else {
      setChatFromMe(false);
    }
    if (userEmail === adminEmail) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userEmail, sender_email, getEmailList, isAdmin]);

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
            {isAdmin ? (
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
