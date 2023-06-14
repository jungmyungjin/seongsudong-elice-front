import { useMemo } from 'react';
import styles from './chatInput.module.scss';
import darkStyles from './chatInputDark.module.scss';
import { ReactComponent as Send } from 'assets/Send.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

import { IChatInput } from 'types/chat';

function ChatInput({
  inputValue,
  handleInputChange,
  handleClick,
  handleEnter,
}: IChatInput) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={styles.chatInputContainer}>
      <textarea
        className={styles.chatInput}
        value={inputValue}
        maxLength={500}
        onChange={handleInputChange}
        onKeyPress={handleEnter}
      />
      <button className={selectedStyles.sendButton} onClick={handleClick}>
        <div className={selectedStyles.sendIconWrapper}>
          <Send />
        </div>
      </button>
    </div>
  );
}

export default ChatInput;
