import { useEffect } from 'react';
import { shareKakao } from './shareKakao';

import { useAppSelector } from 'hooks/useRedux';

import { ReactComponent as KakaoIcon } from 'assets/Kakao.svg';
import styles from './kakaoShareButton.module.scss';

const { Kakao } = window;

function KakaoShareButton() {
  const myReservationDetail = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );

  const zoneType = myReservationDetail.seat.split(' ')[0];
  const visitors = myReservationDetail.visitors;
  const date = myReservationDetail.date;
  const time = myReservationDetail.time;
  const seat = myReservationDetail.seat;
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
    console.log(Kakao.isInitialized());
    console.log(Kakao);
  }, []);

  return (
    <>
      <button
        type='submit'
        className={styles.kakaoButton}
        onClick={() => shareKakao(buttonContents)}
      >
        <div className={styles.KakaoShareText}>
          <KakaoIcon />
          <p>카카오톡 공유하기</p>
        </div>
      </button>
    </>
  );
}

export default KakaoShareButton;
