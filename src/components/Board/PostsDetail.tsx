import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './postsDetail.module.scss';

interface Post {
  id: number;
  category: string;
  title: string;
  images: string;
  description: string;
  created_at: string;
  views: number;
  email: string;
  name: string;
  generation: string;
  isAdmin: number;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate(); // useNavigate hook을 가져옵니다.

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(response.data.postData);
      // console.log(response.data.postData);
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

  const convertStringToDate = (date: string) => {
    const value = date.split('T')[0];
    return value;
  };

  return (
    <div className={styles.postDetail}>
      <div className={styles.title}>
        <p>{post.title}</p>
      </div>
      <div className={styles.postInfo}>
        <p>
          {post.name} | {convertStringToDate(post.created_at)} | 조회수 :{' '}
          {post.views}
        </p>
      </div>
      <div className={styles.description}>
        <p>{post.description}</p>
      </div>
      <div className={styles.updateAndDeleteBtn}>
        <button className={styles.updateBtn} onClick={handleEdit}>
          수정
        </button>
        <button className={styles.deleteBtn}>삭제</button>
      </div>
      <div className={styles.underLine}>
        <p>댓글 0개</p>
      </div>
    </div>
  );
};

export default PostDetail;
