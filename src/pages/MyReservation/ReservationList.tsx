import styles from './reservationList.module.scss';

import { ReactComponent as ChevronRight } from '../../assets/ChevronRight.svg';

import { MyReservation } from 'types/myReservation';

interface Props {
  reservation: MyReservation;
  onClick: () => void;
}

function ReservationList({ reservation, onClick }: Props) {
  const returnReservationTime = (start_time: string, end_time: string) => {
    const startTime = `${start_time.slice(0, 2)}:${start_time.slice(3, 5)}`;
    const endTime = `${end_time.slice(0, 2)}:${end_time.slice(3, 5)}`;
    return `${startTime}~${endTime}`;
  };

  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };

  return (
    <div className={styles.reservationList}>
      <div
        className={styles.reservationContainer}
        key={reservation.reservation_id}
        onClick={onClick}
      >
        <div className={styles.eachReservation}>
          <p className={styles.date}>
            {convertStringToDate(reservation.reservation_date)}
          </p>
          <p className={styles.timeAndSeat}>
            {returnReservationTime(
              reservation.start_time,
              reservation.end_time,
            )}
            &nbsp;&nbsp;
            {reservation.seat_type} {reservation.seat_number}
          </p>
        </div>
        <div className={styles.icon}>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

export default ReservationList;
