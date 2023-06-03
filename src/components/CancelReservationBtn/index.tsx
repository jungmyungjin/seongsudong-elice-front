import React from 'react';
import styles from './cancelReservationBtn.module.scss';
import ConfirmModal from 'components/common/ConfirmModal';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openConfirmModal, closeConfirmModal } from 'reducers/modal';

function CancelReservationBtn() {
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  /* 현재 예약 정보 가져와서 */
  const myReservationDetail = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );

  const handleOpenModal = (e: React.MouseEvent) => {
    dispatch(openConfirmModal());
  };

  /* 여기에 dispatch(action종류) 작성해서 API연결 */
  const modalController = () => {
    dispatch(closeConfirmModal());
    // 예시) dispatch(cancelReservation(myReservationDetail));
  };
  return (
    <>
      {isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='해당 예약을 취소하시겠습니까?'
          modalController={modalController}
        />
      )}
      <button
        type='submit'
        className={styles.calcelButton}
        onClick={handleOpenModal}
      >
        <div className={styles.text}>예약 취소하기</div>
      </button>
    </>
  );
}

export default CancelReservationBtn;
