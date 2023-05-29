import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { closeConfirmModal } from 'reducers/modal';
import styles from './ConfirmModal.module.scss';
import { ModalProps } from 'types/modal';

function ConfirmModal({ modalName, modalContent }: ModalProps) {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  // const closeModal = () => {
  //   dispatch(closeConfirmModal());

  return (
    <div className={styles.modalContainer}>
      <div className={styles.backdrop}></div>
      <div className={styles.overlay}>
        <div className={styles.modalTop}>
          <div className={styles.modalTitle}>Notification</div>
        </div>
        <div className={styles.modalMessage}>{modalContent}</div>
        <button className={styles.confirmBtn}>취소</button>
        <button className={styles.confirmBtn}>확인</button>
      </div>
    </div>
  );
}

export default ConfirmModal;
