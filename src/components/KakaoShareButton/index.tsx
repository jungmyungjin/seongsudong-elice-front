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

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
    console.log(Kakao.isInitialized());
    console.log(Kakao);
  }, []);

  const description = `[성수동 엘리스] 예약 안내\n\n\n*예약날짜: ${date}\n\n*예약시간: ${time}\n\n*예약좌석: ${seat}\n\n\n예약 시간을 꼬~옥! 지켜주세요💜`;
  const meetingRoomDescription = `[성수동 엘리스] 예약 안내\n\n\n*예약날짜: ${date}\n\n*예약시간: ${time}\n\n*예약좌석: ${seat}\n\n*모든 방문자: ${visitors}\n\n\n예약 시간을 꼬~옥! 지켜주세요💜`;

  const returnMessage = () => {
    if (zoneType !== '미팅룸') return description;
    return meetingRoomDescription;
  };
  return (
    <>
      <button
        type='submit'
        className={styles.kakaoButton}
        onClick={() => shareKakao(returnMessage())}
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
