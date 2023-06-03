import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Pagination from '../common/Pagination';
import PostList from '../common/PostList';
import SearchBox from '../common/SearchBox';
import styles from './board.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as PostBtn } from 'assets/Create.svg';
import { Post } from 'types/post';
import postsData from './postsData.json';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 상태 변수
  const [selectedTab, setSelectedTab] = useState('자유');


  //더미 데이터 테스트
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const category = selectedTab === '자유' ? '자유게시판' : '공지게시판';
  //     const response = postsData.filter(post => post.category === category);
  //     console.log(response);
  //     setPosts(response);
  //   };
  //   fetchPosts();
  // }, [selectedTab]);
  
  // api 테스트
  useEffect(() => {
    const fetchPosts = async () => {
      const category = selectedTab === '자유' ? '자유게시판' : '공지게시판';
      const response = await axios.get(
        `http://localhost:5000/api/posts?category=${category}`
      );
      // 선택된 탭에 따라 게시물을 필터링합니다.
      console.log(response.data);
      setPosts(response.data);
    };
    fetchPosts();
  }, [selectedTab]); // selectedTab 상태 변경시 데이터를 다시 불러옵니다.
  

  // 검색어가 바뀌거나 포스트가 바뀌었을 때 필터링된 포스트를 업데이트합니다.
  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        post => post.title.toLowerCase().includes(searchTerm.toLowerCase()), // 대소문자를 구분하지 않고 검색합니다.
      ),
    );
    setCurrentPage(1); // 페이지를 처음으로 돌립니다.
  }, [posts, searchTerm]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles['posts-container']}>
      <div className={styles.tabBox}>
        <Link
          to='/post/free'
          className={classNames(styles.freePost, {
            [styles.selected]: selectedTab === '자유',
          })}
          onClick={() => setSelectedTab('자유')}
        >
          <p>자유</p>
        </Link>
        <Link
          to='/post/free'
          className={classNames(styles.freePost, {
            [styles.selected]: selectedTab === '공지',
          })}
          onClick={() => setSelectedTab('공지')}
        >
          <p>공지</p>
        </Link>
        <Link to='/post/free/create' className={styles.createBtn}>
          <PostBtn />
        </Link>
      </div>
      {/* 검색 컴포넌트 불러옴. */}
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.lengthBox}>
        <p>전체 {filteredPosts.length}개</p>
      </div>
      {/* PostList 컴포넌트 불러옴 */}
      <div className={styles.postList}>
        <PostList posts={currentPosts} />
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Posts;
