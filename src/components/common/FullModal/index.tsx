import { useAppDispatch } from 'hooks/useRedux';
import {
  closeChatModal,
  closeMyReservationModal,
  closeChatListModal,
} from 'reducers/modal';

import styles from './fullmodal.module.scss';
import { FullModalProps } from 'types/modal';
import { ReactComponent as ChevronLeft } from 'assets/ChevronLeft.svg';

function FullModal({ children, title, modalType }: FullModalProps) {
  const dispatch = useAppDispatch();

  const closeAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (modalType === 'chat') dispatch(closeChatModal());
    if (modalType === 'reservation') dispatch(closeMyReservationModal());
    if (modalType === 'adminChatListModal') dispatch(closeChatListModal());
  };

  let overlayClass = styles.overlay;

  if (modalType === 'chat') {
    overlayClass = `${overlayClass} ${styles.chat}`;
  } else if (modalType === 'adminChatListModal') {
    overlayClass = `${overlayClass} ${styles.adminChatList}`;
  }

  return (
    <div>
      <div className={overlayClass}>
        <div className={styles.container}>
          <div className={styles.header}>
            <ChevronLeft className={styles.goback} onClick={closeAction} />
            <label className={styles.headerTitle}>{title}</label>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default FullModal;
