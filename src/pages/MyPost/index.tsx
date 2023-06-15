import { useEffect, useMemo, useState } from 'react';
import { usePaginate } from 'hooks/usePaginate';

import Pagination from 'components/common/Pagination';
import SearchBox from 'components/common/SearchBox';
import PostList from 'components/common/PostList';

import Loading from 'components/common/Loading';

import styles from './myPost.module.scss';
import darkStyles from './myPostDark.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { myPost } from 'types/myPost';

import { loadMyPost } from 'actions/myPost';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

function MyPost() {
  const { email } = useAppSelector(state => state.user);
  const { myPost, loadMyPostLoading, loadMyPostDone, loadMyPostError } =
    useAppSelector(state => state.myPost);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<myPost[]>([]);
  const postsPerPage = 10;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadMyPost(email));
  }, []);

  useEffect(() => {
    if (myPost !== undefined) {
      setFilteredPosts(
        myPost.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    goToPage(1);
  }, [myPost, searchTerm]);

  const { currentItems, currentPage, goToPage } = usePaginate(
    filteredPosts,
    postsPerPage,
  );

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={selectedStyles.postContainer}>
      <div className={selectedStyles.title}>내가 쓴 게시물</div>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={selectedStyles.lengthBox}>
        <p>전체 {filteredPosts.length}개</p>
      </div>
      {filteredPosts.length === 0 ||
        (loadMyPostError && (
          <div className={selectedStyles.noPost}>등록된 게시물이 없습니다.</div>
        ))}
      <div className={selectedStyles.postList}>
        {loadMyPostLoading && <Loading />}
        {loadMyPostDone && <PostList posts={currentItems} />}
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
