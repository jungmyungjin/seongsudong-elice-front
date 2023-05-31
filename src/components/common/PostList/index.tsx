import React from 'react';
import { Link } from 'react-router-dom';
import styles from './postList.module.scss';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className={styles['posts-list']}>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`} className={styles.eachData}>
            <p>{post.title}</p>
            <p>{post.id}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
