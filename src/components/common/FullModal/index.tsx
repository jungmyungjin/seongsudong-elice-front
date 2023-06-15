import { useAppDispatch } from 'hooks/useRedux';
import {
  closeChatModal,
  closeMyReservationModal,
  closeChatListModal,
} from 'reducers/modal';

import styles from './fullmodal.module.scss';
import darkStyles from './fullmodalDark.module.scss';
import { FullModalProps } from 'types/modal';
import { ReactComponent as ChevronLeft } from 'assets/ChevronLeft.svg';

import { offline } from 'actions/access';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { useMemo } from 'react';

function FullModal({ children, title, modalType }: FullModalProps) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  const dispatch = useAppDispatch();

  const closeAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (modalType === 'chat') {
      const userEmail = 'test3@example.com';
      dispatch(closeChatModal());
      // dispatch(offline(userEmail));
    }
    if (modalType === 'reservation') dispatch(closeMyReservationModal());
    if (modalType === 'adminChatListModal') dispatch(closeChatListModal());
  };

  let overlayClass = selectedStyles.overlay;

  if (modalType === 'chat') {
    overlayClass = `${overlayClass} ${selectedStyles.chat}`;
  } else if (modalType === 'adminChatListModal') {
    overlayClass = `${overlayClass} ${styles.adminChatList}`;
  }

  return (
    <div>
      <div className={overlayClass}>
        <div className={selectedStyles.container}>
          <div className={selectedStyles.header}>
            <ChevronLeft
              className={selectedStyles.goback}
              onClick={closeAction}
            />
            <label className={selectedStyles.headerTitle}>{title}</label>
          </div>
          <div className={selectedStyles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default FullModal;
