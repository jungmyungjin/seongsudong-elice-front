import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './postsDetail.module.scss';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate(); // useNavigate hook을 가져옵니다.

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPost(response.data);
    };

    fetchPost();
  }, [id]);

  // 수정 버튼 클릭 시 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/post/free/editPost/${id}`);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.postDetail}>
      <div className={styles.title}>
        <p>{post.title}</p>
      </div>
      <div className={styles.postInfo}>
        <p>홍길동 | 2023-05-25 | 조회수 : 30</p>
      </div>
      <div className={styles.description}>
        <p>{post.body}</p>
      </div>
      <div className={styles.updateAndDeleteBtn}>
        <button className={styles.updateBtn} onClick={handleEdit}>수정</button>
        <button className={styles.deleteBtn}>삭제</button>
      </div>
      <div className={styles.underLine}>
        <p>댓글 0개</p>
      </div>
    </div>
  );
};

export default PostDetail;
