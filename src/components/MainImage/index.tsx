import React from 'react';
import styles from './mainImage.module.scss';
import CountUp from 'react-countup';

const MainImage = (): React.ReactElement => {
  return (
    <div className={styles.mainImage}>
      <video
        className={styles.mainVideo}
        src='/videos/elice_landing_0120.mp4'
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList='nodownload'
        style={{ pointerEvents: 'none' }}
      />
      <div className={styles.titleLayout}>
        <p className={(styles.title, styles.typing)}>성수동 엘리스</p>
      </div>

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
              <CountUp delay={5} duration={4.75} end={22} />
            </span>
            <span>명</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
