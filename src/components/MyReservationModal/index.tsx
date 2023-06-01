import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { closeMyReservationModal } from 'reducers/modal';

import FullModal from '../common/FullModal';
import KakaoShareButton from 'components/KakaoShareButton';
import CancelReservationBtn from 'components/CancelReservationBtn';

import styles from './myReservationModal.module.scss';

function MyReservationModal() {
  const myReservationDetail = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );
  const dispatch = useAppDispatch();

  const zoneType = myReservationDetail.seat.split(' ')[0];
  const visitors = myReservationDetail.visitors;
  const dateAndTime = myReservationDetail.date + ' ' + myReservationDetail.time;
  const seat = myReservationDetail.seat;

  useEffect(() => {
    return () => {
      dispatch(closeMyReservationModal());
    };
  }, [dispatch]);

  return (
    <FullModal title='예약 상세 조회' modalType='reservation'>
      <div className={styles.container}>
        <section className={styles.seatLayoutContainer}>
          {zoneType !== '미팅룸' ? (
            <>여기는 프로그래밍존 UI를 놓으시면 됩니다.</>
          ) : (
            <>여기는 미팅룸 UI를 놓으시면 됩니다.</>
          )}
        </section>

        <section className={styles.contentsContainer}>
          <div className={styles.dateContainer}>
            <p>예약 내용</p>
            <p>{dateAndTime}</p>
          </div>

          <div className={styles.seatContainer}>
            <p>예약 좌석</p>
            <p>{seat}</p>
          </div>

          {visitors.length > 0 ? (
            <div className={styles.visitorsContainer}>
              <p>모든 방문자</p>
              <p>{myReservationDetail.visitors}</p>
            </div>
          ) : null}
        </section>

        <section className={styles.buttonContainer}>
          <KakaoShareButton />
          <CancelReservationBtn />
        </section>
      </div>
    </FullModal>
  );
}

export default MyReservationModal;
