import React from 'react';
import styles from './cancelReservationBtn.module.scss';

function CancelReservationBtn() {
  return (
    <>
      <button type='submit' className={styles.calcelButton}>
        <div className={styles.text}>예약 취소하기</div>
      </button>
    </>
  );
}

export default CancelReservationBtn;
