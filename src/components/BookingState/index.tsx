import React from 'react';

import { getDate } from 'utils/getTime';

import styles from './bookingState.module.scss';
import BookingTable from 'components/BookingTable';

interface BookingStateInterface {
  date: string;
  toggleOnlyCurrentHandler: () => void;
  showOnlyCurrent: boolean;
  filteredData: any;
  currentHour: string;
  goodbyeHandler: (bookingId: number) => void;
}

function BookingState(props: BookingStateInterface) {
  return (
    <div>
      <div className={styles.reservationHeader}>
        <h2>예약 정보</h2>

        {props.date === getDate() && (
          <button onClick={props.toggleOnlyCurrentHandler}>
            {props.showOnlyCurrent ? '모든 시간 보기' : '현재 시간만 보기'}
          </button>
        )}
      </div>

      <hr />

      <BookingTable
        tableData={props.filteredData}
        currentHour={props.currentHour}
        goodbyeHandler={props.goodbyeHandler}
      />
    </div>
  );
}

export default BookingState;
