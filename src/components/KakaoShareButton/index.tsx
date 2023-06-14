import { useEffect, useMemo } from 'react';
import { shareKakao } from './shareKakao';

import { useAppSelector } from 'hooks/useRedux';

import { ReactComponent as KakaoIcon } from 'assets/Kakao.svg';
import styles from './kakaoShareButton.module.scss';
import darkStyles from './kakaoShareButtonDark.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

const { Kakao } = window;

function KakaoShareButton() {
  const myReservationDetail = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );

  const returnReservationTime = (start_time: string, end_time: string) => {
    const startTime = `${start_time.slice(0, 5)}`;
    const endTime = `${end_time.slice(0, 5)}`;
    return `${startTime}~${endTime}`;
  };

  const visitors = myReservationDetail.visitors;
  const date = myReservationDetail.reservation_date;
  const time = returnReservationTime(
    myReservationDetail.start_time,
    myReservationDetail.end_time,
  );
  const seat = `${myReservationDetail.seat_type} ${myReservationDetail.seat_number}`;
  const buttonContents = {
    date,
    time,
    seat,
    visitors,
  };

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <>
      <button
        type='submit'
        className={selectedStyles.kakaoButton}
        onClick={() => shareKakao(buttonContents)}
      >
        <div className={selectedStyles.KakaoShareText}>
          <KakaoIcon />
          <p>카카오톡 공유하기</p>
        </div>
      </button>
    </>
  );
}

export default KakaoShareButton;
