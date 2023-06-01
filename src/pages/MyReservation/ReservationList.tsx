import styles from './reservationList.module.scss';

import { ReactComponent as ChevronRight } from '../../assets/ChevronRight.svg';

import { MyReservation } from 'types/myReservation';

interface Props {
  reservation: MyReservation;
  onClick: () => void;
}

function ReservationList({ reservation, onClick }: Props) {
  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };

  return (
    <div className={styles.reservationList}>
      <div
        className={styles.reservationContainer}
        key={reservation.id}
        onClick={onClick}
      >
        <div className={styles.eachReservation}>
          <p className={styles.date}>{convertStringToDate(reservation.date)}</p>
          <p className={styles.timeAndSeat}>
            {reservation.time} {reservation.seat}
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
