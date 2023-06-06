import { useEffect, useState } from 'react';

import Pagination from 'components/common/Pagination';
import { usePaginate } from 'hooks/usePaginate';

import styles from './myReservation.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { openMyReservationModal } from 'reducers/modal';
import {
  loadMyReservation,
  setMyReservationDetail,
} from 'actions/myReservation';

import MyReservationModal from '../../components/MyReservationModal';
import ReservationList from './ReservationList';

function MyReservationPage() {
  const [showUpcomingReservations, setShowUpcomingReservations] =
    useState(true);

  const { pastReservations, upcomingReservations } = useAppSelector(
    state => state.myReservation,
  );
  const { email } = useAppSelector(state => state.user);

  const myReservationList = showUpcomingReservations
    ? upcomingReservations
    : pastReservations;

  const { isMyRevervationModalOpen } = useAppSelector(state => state.modal);
  const postsPerPage = 10;
  const dispatch = useAppDispatch();

  const {
    currentItems: currentReservation,
    currentPage,
    goToPage,
  } = usePaginate(myReservationList, postsPerPage);

  useEffect(() => {
    dispatch(loadMyReservation(email));
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
        <div className={styles.filterBox}>
          <button
            className={`${styles.reservationTypeBtn} ${
              showUpcomingReservations ? styles.active : ''
            }`}
            onClick={() => setShowUpcomingReservations(true)}
          >
            잡힌 예약
          </button>
          <button
            className={`${styles.reservationTypeBtn} ${
              !showUpcomingReservations ? styles.active : ''
            }`}
            onClick={() => setShowUpcomingReservations(false)}
          >
            지난 예약
          </button>
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
