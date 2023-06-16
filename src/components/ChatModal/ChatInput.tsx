import { useMemo, useState } from 'react';
import styles from './chatInput.module.scss';
import darkStyles from './chatInputDark.module.scss';
import { ReactComponent as Send } from 'assets/Send.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

import { IChatInput } from 'types/chat';

function ChatInput({ inputRef, handleClick }: IChatInput) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );
  const [chatMessage, setChatMessage] = useState<string>('');

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setChatMessage(e.target.value);
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClick(chatMessage);
    setChatMessage('');
  };

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick(chatMessage);
      setChatMessage('');
    }
  }

  return (
    <div className={selectedStyles.chatInputContainer}>
      <textarea
        ref={inputRef}
        className={selectedStyles.chatInput}
        value={chatMessage}
        maxLength={500}
        onChange={handleInputChange}
        onKeyPress={handleEnter}
      />
      <button className={selectedStyles.sendButton} onClick={e => onClick(e)}>
        <div className={selectedStyles.sendIconWrapper}>
          <Send />
        </div>
      </button>
    </div>
  );
}

export default ChatInput;
