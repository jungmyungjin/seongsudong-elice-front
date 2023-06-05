import React, { useContext } from 'react';
import { ReservationContext, ReservationInfo } from './ReservationProvider';
import { CreateTypeSelector } from './ReservationOptions';
import styles from './ReservationOptions.module.scss';

import { ReactComponent as X } from 'assets/X.svg';
import KakaoShareButton from 'components/KakaoShareButton';

const SubmitModal = ({ onClick }: { onClick: () => void }) => {
  const { reservationInfo, updateReservationInfo } =
    useContext(ReservationContext);

  return (
    <div className={styles.back}>
      <div className={styles.modalContainer}>
        <div className={styles.X} onClick={onClick}>
          <X />
        </div>
        <div>{reservationInfo.date.replace(/\-/g, '.')}</div>
        <div>{reservationInfo.startTime}</div>
        <div>{`${reservationInfo.seatType} ${reservationInfo.seat}번`}</div>
        <div>예약이 완료되었습니다!</div>
        <button className={styles.emailShareButton}>이메일로 공유하기</button>
        <div className={styles.KakaoShareButton}>
          <KakaoShareButton />
        </div>
        <button className={styles.checkReservationButton}>예약조회</button>
      </div>
    </div>
  );
};

export default SubmitModal;
