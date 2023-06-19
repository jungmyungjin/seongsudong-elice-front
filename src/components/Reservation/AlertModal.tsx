import React, { useMemo } from 'react';
import { ReactComponent as AlertCircle } from 'assets/AlertCircle.svg';
import styles from './alertModal.module.scss';
import darkStyles from './alertModalDark.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

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
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <section onClick={onClick} className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.overlay}>
          <header className={selectedStyles.modalTop}>
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
    </section>
  );
};

export default AlertModal;
