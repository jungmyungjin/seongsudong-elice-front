import React, { useEffect, useState } from 'react';
import { getDate } from 'utils/getTime';
import styles from './mainImage.module.scss';
import CountUp from 'react-countup';
import axios from 'axios';

const MainImage = (): React.ReactElement => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [countTodayUser, setCountTodayUser] = useState(0);
  const [countTodayReservations, setCountTodayReservations] = useState(0);

  const now = getDate();
  const apiTodayUsers =
    process.env.REACT_APP_BACKEND_ADDRESS + '/reservations/users/' + now || '';
  const apiTodayReservations =
    process.env.REACT_APP_BACKEND_ADDRESS + '/reservations/' + now || '';

  const getTodayInfo = async () => {
    try {
      const [resTodayUsers, resTodayReservations] = await Promise.all([
        await axios.get(apiTodayUsers, {
          withCredentials: true,
        }),
        await axios.get(apiTodayReservations, {
          withCredentials: true,
        }),
      ]);

      setCountTodayUser(resTodayUsers.data.totalUserCount);
      setCountTodayReservations(resTodayReservations.data.count);

      // // resTodayUsers.da
      // console.log(
      //   resTodayUsers.data.totalUserCount,
      //   resTodayReservations.data.count,
      // );

      // if (response.status === 200) {
      //   setRemainSeat(Object.keys(response.data).length - 2); // -2 : 미팅룸
      // }
    } catch (error) {
      console.log('Error getRemainSeat :', error);
    }
  };

  useEffect(() => {
    getTodayInfo();
  }, []);

  return (
    <div className={styles.mainImage}>
      <video
        className={isVideoLoaded ? styles.mainVideo : styles.mainVideoHide}
        src='/videos/elice_landing_0120.mp4'
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList='nodownload'
        onLoadedData={() => setIsVideoLoaded(true)}
      />
      <div className={styles.titleLayout}>
        <p className={(styles.title, styles.typing)}>성수동 엘리스</p>
      </div>

      <div className={styles.todayInfo}>
        <div className={styles.todaySeat}>
          <div className={styles.infoTitle}>오늘 이용자 수</div>
          <div className={styles.infoValue}>
            <span>
              <CountUp
                key={countTodayUser}
                delay={4.5}
                duration={4.75}
                end={countTodayUser}
              />
            </span>
            <span>명</span>
          </div>
        </div>
        <div className={styles.todaySeat}>
          <div className={styles.infoTitle}>오늘 예약 건 수</div>
          <div className={styles.infoValue}>
            <span>
              <CountUp
                key={countTodayReservations}
                delay={4.5}
                duration={4.75}
                end={countTodayReservations}
              />
            </span>
            <span>석</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
