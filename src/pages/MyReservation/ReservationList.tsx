import styles from './reservationList.module.scss';
import { MyReservation } from 'types/myReservation';
import { ReactComponent as ChevronRight } from '../../assets/ChevronRight.svg';

interface Props {
  reservationList: MyReservation[];
}

function ReservationList({ reservationList }: Props) {
  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };
  return (
    <div className={styles.reservationList}>
      {reservationList.map((item, _) => (
        <div className={styles.reservationContainer} key={item.id}>
          <div className={styles.eachReservation}>
            <p className={styles.date}>{convertStringToDate(item.date)}</p>
            <p className={styles.timeAndSeat}>
              {item.time} {item.seat}
            </p>
          </div>
          <div className={styles.icon}>
            <ChevronRight />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationList;
