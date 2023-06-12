import { useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import {
  closeSendInputModal,
  openConfirmModal,
  closeConfirmModal,
} from 'reducers/modal';
import { sendEmail } from 'actions/myReservation';

import { ReactComponent as MailFast } from 'assets/MailFast.svg';
import { ReactComponent as Send } from 'assets/Send.svg';
import styles from './inputEmailModal.module.scss';

import ConfirmModal from 'components/common/ConfirmModal';

function InputEmailModal() {
  const { isSendInputModalOpen, isConfirmModalOpen } = useAppSelector(
    state => state.modal,
  );
  const { reservation_id } = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );
  const { sendEmailDone, sendEmailError } = useAppSelector(
    state => state.myReservation,
  );
  const [email, setEmail] = useState<string>('');
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target && isSendInputModalOpen)
      dispatch(closeSendInputModal());
  };

  const handleCloseModal = () => {
    dispatch(closeSendInputModal());
  };

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    const data = {
      email,
      reservationId: reservation_id,
    };
    dispatch(sendEmail(data));
    dispatch(openConfirmModal());
    setEmail('');
  };

  return (
    <>
      {sendEmailDone && isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='이메일이 전송되었습니다!😉'
          modalController={() => {
            dispatch(closeConfirmModal());
          }}
        />
      )}
      {sendEmailError && isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='이메일 전송 중에 오류가 발생했습니다.🥹'
          modalController={() => {
            dispatch(closeConfirmModal());
          }}
        />
      )}
      {isSendInputModalOpen && (
        <div
          ref={modalRef}
          onClick={onClickBackdrop}
          className={styles.backdrop}
        >
          <div className={styles.inputModalContainer}>
            <div className={styles.overlay}>
              <div className={styles.modalTop}>
                <div className={styles.modalTitle}>
                  <MailFast />
                </div>
              </div>
              <div className={styles.modalMessage}>
                💡 예약정보를 공유할 이메일을 입력해주세요.
              </div>
              <input
                className={styles.emailInput}
                value={email}
                onChange={handleInputEmail}
              />
              <div className={styles.modalButtonContainer}>
                <button
                  className={styles.confirmBtn}
                  onClick={handleCloseModal}
                >
                  취소
                </button>
                <button className={styles.confirmBtn} onClick={handleSendEmail}>
                  <Send />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InputEmailModal;
