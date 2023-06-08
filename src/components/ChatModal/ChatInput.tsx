import styles from './chatInput.module.scss';
import { ReactComponent as Send } from 'assets/Send.svg';

import { IChatInput } from 'types/chat';

function ChatInput({
  inputValue,
  handleInputChange,
  handleClick,
  handleEnter,
}: IChatInput) {
  return (
    <div className={styles.chatInputContainer}>
      <textarea
        className={styles.chatInput}
        value={inputValue}
        maxLength={500}
        onChange={handleInputChange}
        onKeyPress={handleEnter}
      />
      <button className={styles.sendButton} onClick={handleClick}>
        <div className={styles.sendIconWrapper}>
          <Send />
        </div>
      </button>
    </div>
  );
}

export default ChatInput;
