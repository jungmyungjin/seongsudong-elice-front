import styles from './reservationList.module.scss';
import { MyReservation } from 'types/myReservation';
import { ReactComponent as ChevronRight } from '../../assets/ChevronRight.svg';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openMyReservationModal } from 'reducers/modal';

import MyReservationModal from '../../components/MyReservationModal';

/**
 * 더미 액션 작업 => 추후에 지워야함
 */
import { createAction } from '@reduxjs/toolkit';

interface Props {
  reservationList: MyReservation[];
}

function ReservationList({ reservationList }: Props) {
  const { isMyRevervationModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  const setMyReservationDetail = createAction<MyReservation>(
    'myReservation/setMyReservationDetail',
  );

  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };

  /* 클릭한 곳의 고유 id로 해당 reservation 데이터를 찾아서 
  setMyReservationDetail을 통해 dispatch */
  const handleOpenReservationModal = (id: number) => {
    const reservation = reservationList.find(item => item.id === id);
    if (reservation) {
      dispatch(setMyReservationDetail(reservation));
    }
    dispatch(openMyReservationModal());
  };

  return (
    <div className={styles.reservationList}>
      {isMyRevervationModalOpen && <MyReservationModal />}
      {reservationList.map((item, _) => (
        <div
          className={styles.reservationContainer}
          key={item.id}
          onClick={() => handleOpenReservationModal(item.id)}
        >
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
