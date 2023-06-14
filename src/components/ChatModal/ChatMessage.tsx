import React, { useState, useEffect, useMemo } from 'react';
import styles from './chatMessage.module.scss';
import darkStyles from './chatMessageDark.module.scss';
import { IChatMessage } from 'types/chat';
import { useAppSelector } from 'hooks/useRedux';
import useOnlineStatus from '../../hooks/useOnlineStatus';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

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

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

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
          <div className={selectedStyles.contentContainerFromOther}>
            {isAdmin ? (
              <div className={selectedStyles.chatName}>
                [{generation}]{name}
              </div>
            ) : (
              <div className={selectedStyles.chatName}>{name}</div>
            )}
            <div className={selectedStyles.contentFromOther}>
              <div className={selectedStyles.chatFromOther}>{message}</div>
              <div className={selectedStyles.chatTimeFromOther}>{sentAt}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
