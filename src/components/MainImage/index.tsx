import React from 'react';
import styles from './mainImage.module.scss';

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
      <div className={styles.title}>성수동 엘리스</div>
    </div>
  );
};

export default MainImage;
