import { useEffect } from 'react';

import Pagination from 'components/common/Pagination';
import { usePaginate } from 'hooks/usePaginate';

import styles from './myReservation.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { MyReservation } from 'types/myReservation';

import { openMyReservationModal } from 'reducers/modal';
import { loadMyReservation } from 'actions/myReservation';

import { createAction } from '@reduxjs/toolkit';

import MyReservationModal from '../../components/MyReservationModal';
import ReservationList from './ReservationList';

function MyReservationPage() {
  const { pastReservations, upcomingReservations } = useAppSelector(
    state => state.myReservation,
  );
  const myReservationList = [...pastReservations, ...upcomingReservations];

  const { isMyRevervationModalOpen } = useAppSelector(state => state.modal);
  const postsPerPage = 10;
  const dispatch = useAppDispatch();

  const {
    currentItems: currentReservation,
    currentPage,
    goToPage,
  } = usePaginate(myReservationList, postsPerPage);

  const setMyReservationDetail = createAction<MyReservation>(
    'myReservation/setMyReservationDetail',
  );

  useEffect(() => {
    dispatch(loadMyReservation());
  }, []);

  const handleOpenReservationModal = (id: string) => {
    const reservation = currentReservation.find(
      item => item.reservation_id === id,
    );
    if (reservation) {
      dispatch(setMyReservationDetail(reservation));
    }
    dispatch(openMyReservationModal());
  };

  return (
    <>
      {isMyRevervationModalOpen && <MyReservationModal />}
      <div className={styles.postContainer}>
        <div className={styles.title}>내 예약 조회</div>
        <div>
          <button className={styles.upcomingReservations}>잡힌 예약</button>
          <button className={styles.pastReservations}>지난 예약</button>
        </div>
        <div className={styles.lengthBox}>
          <p>전체 {myReservationList.length}개</p>
        </div>
        <div className={styles.listBox}>
          {currentReservation.map((item, _) => (
            <ReservationList
              key={item.reservation_id}
              reservation={item}
              onClick={() => handleOpenReservationModal(item.reservation_id)}
            />
          ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={myReservationList.length}
          paginate={goToPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default MyReservationPage;
