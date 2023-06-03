import { useEffect, useState } from 'react';
import { usePaginate } from 'hooks/usePaginate';

import Pagination from 'components/common/Pagination';
import SearchBox from 'components/common/SearchBox';
import PostList from 'components/common/PostList';

import styles from './myPost.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { myPost } from 'types/myPost';

import { loadMyPost } from 'actions/myPost';

function MyPost() {
  const { myPost } = useAppSelector(state => state.myPost);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<myPost[]>([]);
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
    goToPage(1);
  }, [myPost, searchTerm]);

  const { currentItems, currentPage, goToPage } = usePaginate(
    filteredPosts,
    postsPerPage,
  );

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
        <PostList posts={currentItems} />
      </div>
      {filteredPosts.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginate={goToPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default MyPost;
