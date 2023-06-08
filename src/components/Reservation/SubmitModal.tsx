import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../store/configureStore';

import KakaoShareButton from 'components/KakaoShareButton';
import { ReactComponent as X } from 'assets/X.svg';

import styles from './submitModal.module.scss';

const SubmitModal = ({ onClick }: { onClick: () => void }) => {
  const reservationInfo = useSelector((state: RootState) => state.reservation);
  const navigate = useNavigate();

  return (
    <div className={styles.back}>
      <div className={styles.modalContainer}>
        <div className={styles.X} onClick={onClick}>
          <X />
        </div>
        <div>{reservationInfo.reservation_date.replace(/\-/g, '.')}</div>
        <div>{reservationInfo.time}</div>
        <div>{`${reservationInfo.seat_type} ${reservationInfo.seat_number}번`}</div>
        <div>예약이 완료되었습니다!</div>
        <button className={styles.emailShareButton}>이메일로 공유하기</button>
        <div className={styles.KakaoShareButton}>
          <KakaoShareButton />
        </div>
        <button
          className={styles.checkReservationButton}
          onClick={() => navigate('/mypage/myreservation')}
        >
          예약조회
        </button>
      </div>
    </div>
  );
};

export default SubmitModal;
