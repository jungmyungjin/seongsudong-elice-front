import { useEffect, useState } from 'react';

import Pagination from 'components/common/Pagination';
import SearchBox from 'components/common/SearchBox';
import PostList from 'components/common/PostList';

import styles from './myPost.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { myPost } from 'types/myPost';

import { loadMyPost } from 'actions/myPost';

function MyPost() {
  const { myPost } = useAppSelector(state => state.myPost);
  const [filteredPosts, setFilteredPosts] = useState<myPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 10;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadMyPost());
  }, []);

  useEffect(() => {
    setFilteredPosts(
      myPost.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    setCurrentPage(1);
  }, [myPost, searchTerm]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.postContainer}>
      <div className={styles.title}>내가 쓴 게시물</div>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.lengthBox}>
        <p>전체 {filteredPosts.length}개</p>
      </div>
      {filteredPosts.length === 0 && (
        <div className={styles.noPost}>등록된 게시물이 없습니다.</div>
      )}
      <div className={styles.postList}>
        <PostList posts={currentPosts} />
      </div>
      {filteredPosts.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default MyPost;
