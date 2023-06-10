import React, { useRef } from 'react';
import { ReactComponent as AlertCircle } from 'assets/AlertCircle.svg';
import styles from './alertModal.module.scss';

interface AlertModalProps {
  modalMessage1: string;
  modalMessage2: string;
  onClick: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  modalMessage1,
  modalMessage2,
  onClick,
}) => {
  const [ModalClose, setModalClose] = React.useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const onClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target && ModalClose) setModalClose(true);
  };

  return (
    <div ref={modalRef} onClick={onClickBackdrop} className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.overlay}>
          <div className={styles.modalTop}>
            <div className={styles.modalTitle}>
              <AlertCircle />
            </div>
          </div>
          <div className={styles.modalContent}>
            <p>{modalMessage1}</p>
            <p>{modalMessage2}</p>
            <button onClick={onClick}>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
