import { useEffect } from 'react';

import Pagination from 'components/common/Pagination';
import { usePaginate } from 'hooks/usePaginate';

import styles from './myReservation.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { MyReservation } from 'types/myReservation';

import { openMyReservationModal } from 'reducers/modal';

/** 더미 액션 작업 => 추후에 지워야함 */
import { createAction } from '@reduxjs/toolkit';
import reservations from './reservationDummy.json';

import MyReservationModal from '../../components/MyReservationModal';
import ReservationList from './ReservationList';

function MyReservationPage() {
  const { myReservation } = useAppSelector(state => state.myReservation);
  const { isMyRevervationModalOpen } = useAppSelector(state => state.modal);
  const postsPerPage = 10;
  const dispatch = useAppDispatch();

  /* 페이지네이션 */
  const {
    currentItems: currentReservation,
    currentPage,
    goToPage,
  } = usePaginate(myReservation, postsPerPage);

  /** 더미 액션 작업 => 추후에 지워야함 */
  const setMyReservation = createAction<MyReservation[]>(
    'myReservation/setMyReservation',
  );
  /** 더미 액션 작업 => 추후에 지워야함 */
  const setMyReservationDetail = createAction<MyReservation>(
    'myReservation/setMyReservationDetail',
  );

  useEffect(() => {
    dispatch(setMyReservation(reservations));
  }, []);

  /* 클릭한 곳의 고유 id로 해당 reservation 데이터를 찾아서 
  setMyReservationDetail을 통해 dispatch */
  const handleOpenReservationModal = (id: number) => {
    const reservation = currentReservation.find(item => item.id === id);
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
        <div className={styles.lengthBox}>
          <p>전체 {myReservation.length}개</p>
        </div>
        <div className={styles.listBox}>
          {currentReservation.map((item, _) => (
            <ReservationList
              key={item.id}
              reservation={item}
              onClick={() => handleOpenReservationModal(item.id)}
            />
          ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={myReservation.length}
          paginate={goToPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default MyReservationPage;
