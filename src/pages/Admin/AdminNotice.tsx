import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CustomLink from 'components/common/Link';
import Pagination from 'components/common/Pagination';
import PostList from 'components/common/PostList';

import styles from './adminNotice.module.scss';

function AdminNotice() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/posts?category=공지게시판`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      const res = await response.json();

      setPosts(res);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.notice}>
      <CustomLink
        to='/admin'
        title='공지사항 관리'
        icon='notice'
        right={false}
      />

      <div className={styles.btnDiv}>
        <Link
          to='/post/free/create'
          className={styles.addBtn}
          state={{ selectedTab: '공지' }}
        >
          추가
        </Link>
      </div>

      <hr className={styles.hr} />

      <div>
        <PostList posts={currentPosts} />

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default AdminNotice;
