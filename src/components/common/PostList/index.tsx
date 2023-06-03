import React from 'react';
import { Link } from 'react-router-dom';
import styles from './postList.module.scss';
import { ReactComponent as Eye } from 'assets/Eye.svg';

import { Post } from 'types/post';

interface Props {
  posts: Post[];
}

function PostList({ posts }: Props) {
  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };
  return (
    <div className={styles.postList}>
      {posts.map((post, _) => (
        <div className={styles.eachPost} key={post.id}>
          <Link to={`/post/free/${post.id}`}>
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

export default PostList;
