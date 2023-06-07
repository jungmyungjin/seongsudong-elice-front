import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { closeMyReservationModal } from 'reducers/modal';

import FullModal from '../common/FullModal';
import KakaoShareButton from 'components/KakaoShareButton';
import CancelReservationBtn from 'components/CancelReservationBtn';

import { ProgrammingZone, MeetingRoom } from './SeatLayout';

import styles from './myReservationModal.module.scss';

function MyReservationModal() {
  const myReservationDetail = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );
  const dispatch = useAppDispatch();

  const returnReservationTime = (start_time: string, end_time: string) => {
    const startTime = `${start_time.slice(0, 5)}`;
    const endTime = `${end_time.slice(0, 5)}`;
    return `${startTime}~${endTime}`;
  };
  const seatType = myReservationDetail.seat_type;
  const visitors = myReservationDetail.visitors;
  const dateAndTime =
    myReservationDetail.reservation_date +
    ' ' +
    returnReservationTime(
      myReservationDetail.start_time,
      myReservationDetail.end_time,
    );
  const seatNum = myReservationDetail.seat_number;

  useEffect(() => {
    return () => {
      dispatch(closeMyReservationModal());
    };
  }, [dispatch]);

  return (
    <FullModal title='예약 상세 조회' modalType='reservation'>
      <div className={styles.container}>
        <section className={styles.seatLayoutContainer}>
          {seatType !== '미팅룸' ? (
            <>
              <ProgrammingZone myReservation={seatNum} />
            </>
          ) : (
            <>
              <MeetingRoom myReservation={seatNum} />
            </>
          )}
        </section>

        <section className={styles.contentsContainer}>
          <div className={styles.dateContainer}>
            <p>예약 내용</p>
            <p>{dateAndTime}</p>
          </div>

          <div className={styles.seatContainer}>
            <p>예약 좌석</p>
            <p>
              {seatType} {seatNum}
            </p>
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
