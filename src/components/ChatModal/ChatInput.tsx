import React from 'react';
import styles from './chatInput.module.scss';
import { ReactComponent as Send } from 'assets/Send.svg';

interface ChatInputProps {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClick: () => void;
  handleEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

function ChatInput({
  inputValue,
  handleInputChange,
  handleClick,
  handleEnter,
}: ChatInputProps) {
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
