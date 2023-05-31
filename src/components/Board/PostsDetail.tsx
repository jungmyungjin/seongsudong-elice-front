import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // useParams는 현재 URL의 파라미터를 가져올 수 있는 Hook입니다.
import axios from 'axios';
import styles from './postsDetail.module.scss';
import FloatingButton from 'components/common/FloatingButton';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // URL의 파라미터로부터 게시물 ID를 가져옵니다.
  const [post, setPost] = useState<Post | null>(null);  // 상태 변수를 초기화합니다. 처음에는 null입니다.

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);  // 게시물 ID에 해당하는 데이터를 가져옵니다.
      setPost(response.data);  // 가져온 데이터를 상태 변수에 저장합니다.
    };

    fetchPost();  // 데이터를 가져오는 함수를 실행합니다.
  }, [id]);  // id가 바뀔 때마다 데이터를 새로 가져옵니다.

  // post가 null이면 로딩 중입니다.
  if (!post) {
    return <div>Loading...</div>;
  }

  // post가 null이 아니면 게시물 정보를 보여줍니다.
  return (
    <div>
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
          <button className={styles.updateBtn}>수정</button>
          <button className={styles.deleteBtn}>삭제</button>
        </div>
        <div className={styles.underLine}>
          <p>댓글 0개</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;  // 이 컴포넌트를 다른 파일에서 임포트할 수 있도록 export 합니다.
