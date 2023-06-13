import { MouseEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { closeConfirmModal } from 'reducers/modal';
import styles from './confirmModal.module.scss';
import { ModalProps } from 'types/modal';
import { ReactComponent as AlertCircle } from 'assets/AlertCircle.svg';

function ConfirmModal({
  isOpen,
  modalMessage,
  modalSubMessages,
  type,
  modalController,
  closeController,
}: ModalProps) {

  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  isOpen = isOpen ? isOpen : isConfirmModalOpen;
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target && isOpen)
      dispatch(closeConfirmModal());
  };
  const handleCloseModal = () => {
    if (
      (type === 'successCancelMyReservation' ||
        type === 'errorCancelMyReservation' ||
        type === 'DeleteAccout' ||
        type === 'LogOut') &&
      closeController
    ) {
      closeController();
    } else {
      dispatch(closeConfirmModal());
    }
  };


  return (
    <>
      {isOpen && (
        <div
          ref={modalRef}
          onClick={onClickBackdrop}
          className={styles.backdrop}
        >
          <div className={styles.modalContainer}>
            <div className={styles.overlay}>
              <div className={`${styles.modalTop} ${type === 'DeleteAccout' ? styles.modalTopDeleteAccout : ''}`}>
                <div className={styles.modalTitle}>
                  <AlertCircle />
                </div>
              </div>

              <div
                className={`${styles.modalMessage} ${type === 'DeleteAccout' ? styles.modalMessageDeleteAccount : ''}`}>
                {modalMessage}
                <div className={styles.modalSubMessage}>{modalSubMessages?.map((msg, idx) => <span key={idx}>{msg}</span>)}
                </div>
              </div>
              <div className={styles.modalButtonContainer}>
                <button
                  className={`${styles.confirmBtn} ${type === 'DeleteAccout' ? styles.confirmDeleteAccoutBtn : ''}`}
                  onClick={handleCloseModal}
                >
                  취소
                </button>
                <button className={`${styles.confirmBtn} ${type === 'DeleteAccout' ? styles.confirmDeleteAccoutBtn : ''}`}
                  onClick={modalController}>
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
