import React from 'react';
import styles from './main.module.scss';
import { useNavigate } from 'react-router-dom';

const Main = (): React.ReactElement => {
  let navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className={styles.MainLayout}>
      <div className={styles.imageSlider}>이미지 슬라이더</div>
      <div className={styles.noticeBoard}>
        <button onClick={() => handleClick('/post')}>공지사항</button>
      </div>
      <button
        onClick={() => handleClick('/reservation')}
        className={styles.reservation}
      >
        예약하기
      </button>
      <div className={styles.freeBoard}>
        <button onClick={() => handleClick('/post')}>자유 게시판</button>
      </div>
    </div>
  );
};

export default Main;
