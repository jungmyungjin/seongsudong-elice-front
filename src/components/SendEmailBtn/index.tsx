import React, { useMemo } from 'react';

import { ReactComponent as Mail } from 'assets/Mail.svg';

import { sendEmail } from '../../actions/myReservation';
import { openSendInputModal } from 'reducers/modal';
import { useAppDispatch } from 'hooks/useRedux';

import InputEmailModal from './InputEmailModal';
import styles from './sendEmailBtn.module.scss';
import darkStyles from './sendEmailBtnDark.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

function SendEmailBtn() {
  const dispatch = useAppDispatch();

  const handleOpenInputModal = () => {
    dispatch(openSendInputModal());
  };

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <>
      <button
        type='submit'
        className={selectedStyles.sendEmailBtn}
        onClick={handleOpenInputModal}
      >
        <div className={selectedStyles.sendEmailText}>
          <Mail />
          <p>이메일 공유하기</p>
        </div>
      </button>
      <InputEmailModal />
    </>
  );
}

export default SendEmailBtn;
