import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './main2.module.scss';
import MainImage from 'components/MainImage2';
import MainReservationSection from './MainReservationSection';

import axios from 'axios';

import CustomLink from 'components/common/Link';
import PostList from 'components/common/PostList';

const CategoryBtn = ({ name }: { name: string }): JSX.Element => {
  return (
    <div className={styles.categoryLayout}>
      <div className={styles.title}>{name}</div>
    </div>
  );
};

const Main = (): React.ReactElement => {
  let navigate = useNavigate();

  const [freeBoard, setFreeboard] = useState([]);
  const [noticeBoard, setNoticeboard] = useState([]);

  const handleClick = (path: string) => {
    navigate(path);
  };

  const fetchPosts = async () => {
    try {
      const freeBoardPromise = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/top?category=자유게시판`,
      );
      const noticeBoardPromise = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/recent?category=공지게시판`,
      );

      const [freeBoardResponse, noticeBoardResponse] = await Promise.all([
        freeBoardPromise,
        noticeBoardPromise,
      ]);
      const freeBoardData = freeBoardResponse.data;
      const noticeBoardData = noticeBoardResponse.data;

      setNoticeboard(noticeBoardData);
      setFreeboard(freeBoardData);
    } catch (error) {
      console.log('MainBoard Error!', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.MainLayout}>
      <section className={styles.imageSlider}>
        <MainImage />
      </section>

      <section className={styles.reservation}>
        <MainReservationSection route='/reservation' />
      </section>

      <div className={styles.boards}>
        <section className={styles.noticeBoard}>
          <Link
            to={'/post/free'}
            state={{
              tab: '공지',
            }}
            className={styles.link}
          >
            공지사항
          </Link>
          <PostList posts={noticeBoard} />
        </section>
        <section className={styles.freeBoard}>
          <Link to={'/post/free'} className={styles.link}>
            자유 게시판
          </Link>
          <PostList posts={freeBoard} />
        </section>
      </div>
    </div>
  );
};

export default Main;
