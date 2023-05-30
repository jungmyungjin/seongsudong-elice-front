import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { closeChatModal, closeMyReservationModal } from 'reducers/modal';

import styles from './fullmodal.module.scss';
import { FullModalProps } from 'types/modal';
import { ReactComponent as ChevronLeft } from 'assets/ChevronLeft.svg';

function FullModal({ children, title, modalType }: FullModalProps) {
  const dispatch = useAppDispatch();

  const closeAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (modalType === 'chat') dispatch(closeChatModal());
    if (modalType === 'reservation') dispatch(closeMyReservationModal());
  };

  return (
    <div>
      <div className={styles.overlay}>
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
