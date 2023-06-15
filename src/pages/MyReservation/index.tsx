import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Pagination from 'components/common/Pagination';
import Loading from 'components/common/Loading';
import { usePaginate } from 'hooks/usePaginate';

import styles from './myReservation.module.scss';
import darkStyles from './myReservationDark.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { openMyReservationModal } from 'reducers/modal';
import {
  loadMyReservation,
  setMyReservationDetail,
} from 'actions/myReservation';

import MyReservationModal from '../../components/MyReservationModal';
import ReservationList from './ReservationList';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

function MyReservationPage() {
  const [showUpcomingReservations, setShowUpcomingReservations] =
    useState(true);

  const {
    pastReservations,
    upcomingReservations,
    loadMyReservationLoading,
    loadMyReservationDone,
    loadMyReservationError,
  } = useAppSelector(state => state.myReservation);
  const { email } = useAppSelector(state => state.user);
  const { isMyRevervationModalOpen } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  const myReservationList = showUpcomingReservations
    ? upcomingReservations
    : pastReservations;

  const postsPerPage = 10;

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

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <>
      {isMyRevervationModalOpen && <MyReservationModal />}
      <div className={selectedStyles.postContainer}>
        <div className={selectedStyles.title}>내 예약 조회</div>
        <div className={selectedStyles.filterBox}>
          <button
            className={`${selectedStyles.reservationTypeBtn} ${
              showUpcomingReservations ? selectedStyles.active : ''
            }`}
            onClick={() => setShowUpcomingReservations(true)}
          >
            잡힌 예약
          </button>
          <button
            className={`${selectedStyles.reservationTypeBtn} ${
              !showUpcomingReservations ? selectedStyles.active : ''
            }`}
            onClick={() => setShowUpcomingReservations(false)}
          >
            지난 예약
          </button>
        </div>
        <div className={selectedStyles.lengthBox}>
          <p>전체 {myReservationList.length}개</p>
        </div>
        {(currentReservation.length === 0 || loadMyReservationError) && (
          <div className={selectedStyles.noReservationBox}>
            <div className={selectedStyles.noReservation}>예약이 없습니다.</div>
            <Link to='/reservation' className={selectedStyles.Link}>
              예약하러 가기
            </Link>
          </div>
        )}
        <div className={selectedStyles.listBox}>
          {loadMyReservationLoading && <Loading />}
          {loadMyReservationDone &&
            currentReservation.map((item, _) => (
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
