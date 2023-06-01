import { useEffect, useState } from 'react';

import Pagination from 'components/common/Pagination';

import styles from './myReservation.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { MyReservation } from 'types/myReservation';

/** 더미 액션 작업 => 추후에 지워야함 */
import { createAction } from '@reduxjs/toolkit';
import reservations from './reservationDummy.json';

import ReservationList from './ReservationList';

function MyReservationPage() {
  const { myReservation } = useAppSelector(state => state.myReservation);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  const setMyReservation = createAction<MyReservation[]>(
    'myReservation/setMyReservation',
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMyReservation(reservations));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentReservation = myReservation.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.postContainer}>
      <div className={styles.title}>내 예약 조회</div>
      <div className={styles.lengthBox}>
        <p>전체 {myReservation.length}개</p>
      </div>
      <ReservationList reservationList={currentReservation} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={myReservation.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default MyReservationPage;
