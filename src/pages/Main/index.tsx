import React from 'react';
import styles from './main.module.scss';
import MainImage from 'components/MainImage';
import Boards from './Boards';
import MainReservationSection from './MainReservationSection';
import volum from 'assets/volum.svg';
import Chat from 'assets/Chat.svg';

const Main = (): React.ReactElement => {
  return (
    <div className={styles.MainLayout}>
      <section className={styles.imageSlider}>
        <MainImage />
      </section>

      <section className={styles.noticeBoard}>
        <Boards icon={volum} boardName='공지사항' route='/post' />
      </section>

      <section className={styles.reservation}>
        <MainReservationSection route='/reservation' />
      </section>

      <section className={styles.freeBoard}>
        <Boards icon={Chat} boardName='자유 게시판' route='/post/free' />
      </section>
    </div>
  );
};

export default Main;
