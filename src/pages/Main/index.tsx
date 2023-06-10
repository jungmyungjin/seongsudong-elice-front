import React, { useState } from 'react';
import styles from './main.module.scss';
import MainImage from 'components/MainImage';
import MainReservationSection from './MainReservationSection';
import axios from 'axios';

import CustomLink from 'components/common/Link';
import PostList from 'components/common/PostList';

const Main = (): React.ReactElement => {
  const [freeBoard, setFreeboard] = useState([]);
  const [noticeBoard, setNoticeboard] = useState([]);

  const fetchPosts = async () => {
    const freeBoardPromise = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/top?category=자유게시판`,
    );
    const noticeBoardPromise = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/recent?category=공지게시판`,
    );

    try {
      const [freeBoardResponse, noticeBoardResponse] = await Promise.all([
        freeBoardPromise,
        noticeBoardPromise,
      ]);
      const freeBoardData = freeBoardResponse.data;
      const noticeBoardData = noticeBoardResponse.data;

      setNoticeboard(noticeBoardData);
      setFreeboard(freeBoardData);
    } catch (error) {
      console.log(error);
    }
  };
  fetchPosts();

  return (
    <div className={styles.MainLayout}>
      <section className={styles.imageSlider}>
        <MainImage />
      </section>

      <section className={styles.noticeBoard}>
        <div className={styles.boardButton}>
          <CustomLink
            key={'notice'}
            to={'/post'}
            title={'공지사항'}
            icon={'notice'}
            right={true}
          />
        </div>
        <PostList posts={noticeBoard} />
      </section>

      <section className={styles.reservation}>
        <MainReservationSection route='/reservation' />
      </section>

      <section className={styles.freeBoard}>
        <div className={styles.boardButton}>
          <CustomLink
            key={'notice'}
            to={'/post/free'}
            title={'자유 게시판'}
            icon={'chat'}
            right={true}
          />
        </div>
        <PostList posts={freeBoard} />
      </section>
    </div>
  );
};

export default Main;
