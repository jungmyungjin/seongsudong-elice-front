import React from 'react';
import { Link } from 'react-router-dom';
import styles from './myPostList.module.scss';
import { ReactComponent as Eye } from 'assets/Eye.svg';

import { myPost } from 'types/myPost';

interface Props {
  posts: myPost[];
}
function MyPostList({ posts }: Props) {
  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };
  return (
    <div className={styles.postList}>
      {posts.map((post, _) => (
        <div className={styles.eachPost} key={post.id}>
          <Link to={`/post/${post.id}`}>
            <div className={styles.postInfo}>
              <div className={styles.nameAndDate}>
                <p className={styles.name}>{post.name}</p>
                <p className={styles.date}>
                  {convertStringToDate(post.created_at)}
                </p>
              </div>
              <div className={styles.viewsContainer}>
                <Eye />
                <p className={styles.views}>{post.views}</p>
              </div>
            </div>
            <p className={styles.title}>{post.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyPostList;
