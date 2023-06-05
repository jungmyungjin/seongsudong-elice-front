import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './postsDetail.module.scss';
import ConfirmModal from 'components/common/ConfirmModal';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openConfirmModal, closeConfirmModal } from 'reducers/modal';
import postsData from './postsData.json';
import commentsData from './commentsData.json';


interface Post {
  id: number;
  category: string;
  title: string;
  images: string[];
  description: string;
  created_at: string;
  views: number;
  email: string;
  name: string;
  generation: string;
  isAdmin: number;
}

interface Comment {
  id: number;
  post_id: number;
  author_email: string;
  content: string;
  created_at: string;
  name: string;
  generation: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate(); // useNavigate hook을 가져옵니다.
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  // //더미 데이터 테스트
  // useEffect(() => {
  //   const fetchPost = () => {
  //     const response = postsData.find((post: Post) => post.id === Number(id));
  //     setPost(response || null);
  //   };

  //   fetchPost();
  // }, [id]);

  // 댓글 더미데이터
  useEffect(() => {
    const fetchComments = () => {
      const response = commentsData.filter((comment: Comment) => comment.post_id === Number(id));
      setComments(response);
    };

    fetchComments();
  }, [id]);

  // api 테스트
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(response.data.postData);
    };

    fetchPost();
  }, [id]);

  // 수정 버튼 클릭 시 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/post/free/editPost/${id}`);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    dispatch(openConfirmModal());
  };

  const modalController = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${id}`);
      if(response.status === 204) {
        dispatch(closeConfirmModal());
        navigate("/post/free");
      }
    } catch (error) {
      console.error(error);
    }
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
      {/* <div><img src={`http://localhost:5000/${post.images}`} /></div> */}
      </div>
      <div className={styles.description}>
        <p>{post.description}</p>
      </div>
      <div className={styles.imgPosition}>
        {post.images.map((image:any, index:any) => (
          <img key={index} src={`http://localhost:5000/${image}`} alt={`post-${index}`} />
        ))}
      </div>
      <div className={styles.updateAndDeleteBtn}>
        <button className={styles.updateBtn} onClick={handleEdit}>
          수정
        </button>
        <div>
          {isConfirmModalOpen && (
          <ConfirmModal
            modalMessage='게시물을 삭제하시겠습니까?'
            modalController={modalController}
          />
          )}
          <button className={styles.deleteBtn} onClick={handleOpenModal}>삭제</button>
        </div>
      </div>
      {/* 댓글 부분 */}
      <div className={styles.underLine}>
        <p>댓글 {comments.length}개</p>
      </div>
      <div className={styles.comments}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.perComment}>
            <img src="/images/rabbit_profile.png" className={styles.commentProfileImage} />
            <div className={styles.commentSet}>
              <div className={styles.commentInfo}>
                <p>[{comment.generation}] {comment.name}</p>
              </div>
              <div className={styles.commentContent}>
                <p>{comment.content}</p>
              </div>
              <div className={styles.createdAt}>
                <p>{convertStringToDate(comment.created_at)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
