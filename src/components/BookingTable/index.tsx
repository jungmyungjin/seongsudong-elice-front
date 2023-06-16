import React, { useMemo } from 'react';

import { getDate } from 'utils/getTime';
import styles from './bookingTable.module.scss';
import darkStyles from './bookingTableDark.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

interface BookingTableInterface {
  tableData: any;
  currentHour?: string;
  goodbyeHandler?: (bookingId: number) => void;
}

function BookingTable(props: BookingTableInterface) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div>
      {props.tableData.length === 0 && <p>예약 정보가 없습니다.</p>}

      {props.tableData.length !== 0 && (
        <table className={selectedStyles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>시간</th>
              <th>좌석</th>
              <th>예약자</th>
              {props.currentHour && <th>퇴실</th>}
            </tr>
          </thead>
          <tbody>
            {props.tableData.map((data: any, index: number) => (
              <tr key={index}>
                <td>
                  {data.start_time}~{data.end_time}
                </td>
                <td>
                  {data.seat_type}-{data.seat_number}
                </td>
                <td>{data.name}</td>
                {props.currentHour && props.goodbyeHandler && (
                  <td>
                    {data.reservation_date === getDate() &&
                      data.start_time <= props.currentHour &&
                      data.end_time > props.currentHour && (
                        <button
                          className={styles.goodbyeBtn}
                          onClick={() =>
                            props.goodbyeHandler?.(data.reservation_id)
                          }
                        >
                          가능
                        </button>
                      )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingTable;
