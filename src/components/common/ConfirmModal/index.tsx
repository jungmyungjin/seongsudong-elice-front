import { MouseEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { closeConfirmModal } from 'reducers/modal';
import styles from './confirmModal.module.scss';
import { ModalProps } from 'types/modal';
import { ReactComponent as AlertCircle } from 'assets/AlertCircle.svg';

function ConfirmModal({ modalMessage, modalController }: ModalProps) {
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target && isConfirmModalOpen)
      dispatch(closeConfirmModal());
  };

  const handleCloseModal = () => {
    dispatch(closeConfirmModal());
  };

  return (
    <>
      {isConfirmModalOpen && (
        <div
          ref={modalRef}
          onClick={onClickBackdrop}
          className={styles.backdrop}
        >
          <div className={styles.modalContainer}>
            <div className={styles.overlay}>
              <div className={styles.modalTop}>
                <div className={styles.modalTitle}>
                  <AlertCircle />
                </div>
              </div>
              <div className={styles.modalMessage}>{modalMessage}</div>
              <div className={styles.modalButtonContainer}>
                <button
                  className={styles.confirmBtn}
                  onClick={handleCloseModal}
                >
                  취소
                </button>
                <button className={styles.confirmBtn} onClick={modalController}>
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmModal;
