import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/configureStore';
import ReservationOptions from './ReservationOptions';
import SeatLayout from 'components/Reservation/SeatLayout';
import styles from './reservation.module.scss';

const Reservation: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <div className={styles.title}>좌석 예약</div>
        <ReservationOptions />
        <SeatLayout />
      </div>
    </Provider>
  );
};

export default Reservation;
