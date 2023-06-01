import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import styles from './myReservationModal.module.scss';

function MyReservationModal() {
  const myReservationDetail = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );

  return (
    <div className={styles.container}>
      <FullModal title='예약 상세 조회' modalType='reservation'>
        <div>예약 상세 조회 모달입니다</div>
        <div>
          <p>예약 ID: {myReservationDetail.id}</p>
          <p>날짜: {myReservationDetail.date}</p>
          <p>시간: {myReservationDetail.time}</p>
          <p>좌석: {myReservationDetail.seat}</p>
          <p>방문자: {myReservationDetail.visitors}</p>
        </div>
      </FullModal>
    </div>
  );
}

export default MyReservationModal;
