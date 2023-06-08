import styles from './chatMessage.module.scss';
import { IChatMessage } from 'types/chat';

function ChatMessage({
  chatFromMe,
  chatMessage,
  fromName,
  isOnline,
  sentTime,
}: IChatMessage) {
  return (
    <>
      {chatFromMe ? (
        <div className={styles.containerFromMe}>
          <div className={styles.contentContainerFromMe}>
            <div className={styles.chatFromMe}>{chatMessage}</div>
            <div className={styles.chatTimeFromMe}>{sentTime}</div>
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
              <div className={styles.chatTimeFromOther}>{sentTime}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
