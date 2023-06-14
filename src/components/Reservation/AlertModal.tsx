import React from 'react';
import { ReactComponent as AlertCircle } from 'assets/AlertCircle.svg';
import styles from './alertModal.module.scss';

interface AlertModalProps {
  modalMessage1: string;
  modalMessage2?: string;
  onClick: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  modalMessage1,
  modalMessage2,
  onClick,
}) => {
  return (
    <aside onClick={onClick} className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.overlay}>
          <header className={styles.modalTop}>
            <div className={styles.modalTitle}>
              <AlertCircle />
            </div>
          </header>
          <div className={styles.modalContent}>
            <p>{modalMessage1}</p>
            <p>{modalMessage2}</p>
            <button onClick={onClick}>확인</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AlertModal;
