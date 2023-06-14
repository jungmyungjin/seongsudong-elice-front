import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './postList.module.scss';
import darkStyles from './postListDark.module.scss';
import { ReactComponent as Eye } from 'assets/Eye.svg';

import { Post } from 'types/post';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

interface Props {
  posts: Post[];
}

function PostList({ posts }: Props) {
  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={styles.postList}>
      {posts.map((post, _) => (
        <div className={selectedStyles.eachPost} key={post.id}>
          <Link to={`/post/free/${post.id}`}>
            <div className={selectedStyles.postInfo}>
              <div className={selectedStyles.nameAndDate}>
                <p className={selectedStyles.name}>{post.name}</p>
                <p className={selectedStyles.date}>
                  {convertStringToDate(post.created_at)}
                </p>
              </div>
              <div className={selectedStyles.viewsContainer}>
                <Eye />
                <p className={selectedStyles.views}>{post.views}</p>
              </div>
            </div>
            <p className={selectedStyles.title}>{post.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;
