import React from 'react';

import { ReactComponent as Mail } from 'assets/Mail.svg';

import { sendEmail } from '../../actions/myReservation';
import { openSendInputModal } from 'reducers/modal';
import { useAppDispatch } from 'hooks/useRedux';

import InputEmailModal from './InputEmailModal';
import styles from './sendEmailBtn.module.scss';

function SendEmailBtn() {
  const dispatch = useAppDispatch();

  const handleOpenInputModal = () => {
    dispatch(openSendInputModal());
  };

  return (
    <>
      <button
        type='submit'
        className={styles.sendEmailBtn}
        onClick={handleOpenInputModal}
      >
        <div className={styles.sendEmailText}>
          <Mail />
          <p>이메일 공유하기</p>
        </div>
      </button>
      <InputEmailModal />
    </>
  );
}

export default SendEmailBtn;
