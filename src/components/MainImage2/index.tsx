import React, { useEffect, useState } from 'react';
import { getDate } from 'utils/getTime';
import styles from './mainImage.module.scss';
import CountUp from 'react-countup';
import axios from 'axios';

const MainImage = (): React.ReactElement => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [remainSeat, setRemainSeat] = useState(0);

  const now = getDate();
  const api =
    process.env.REACT_APP_BACKEND_ADDRESS +
      '/reservations/seat-check?reservation_date=' +
      now || '';

  const getRemainSeat = async () => {
    try {
      const response = await axios.get(api, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRemainSeat(Object.keys(response.data).length - 2); // -2 : 미팅룸
      }
    } catch (error) {
      console.log('Error getRemainSeat :', error);
    }
  };

  useEffect(() => {
    getRemainSeat();
  }, []);

  return (
    <div className={styles.mainImage}>
      <video
        className={isVideoLoaded ? styles.mainVideo : styles.mainVideoHide}
        src='/videos/PulpleSmoke.mp4'
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList='nodownload'
        onLoadedData={() => setIsVideoLoaded(true)}
      />
      <div className={styles.titleLayout}>
        <img
          src='/images/seongsudong_elice_banner.png'
          alt='성수동엘리스'
          className={(styles.title, styles.typing)}
        />
        {/* <p className={(styles.title, styles.typing)}>성수동 엘리스</p> */}
      </div>
      <div className={styles.textContainer}>
        <div className={styles.todayInfo}>
          <div className={styles.todayVisitor}>
            <div className={styles.infoTitle}>오늘 이용자 수</div>
            <div className={styles.infoValue}>
              <span>
                <CountUp delay={5} end={195} />
              </span>
              <span>명</span>
            </div>
          </div>

          <div className={styles.todaySeat}>
            <div className={styles.infoTitle}>잔여 좌석 수</div>
            <div className={styles.infoValue}>
              <span>
                <CountUp
                  key={remainSeat}
                  delay={4.5}
                  duration={4.75}
                  end={remainSeat}
                />
              </span>
              <span>좌석</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
