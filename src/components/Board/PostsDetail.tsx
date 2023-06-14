import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './postsDetail.module.scss';
import ConfirmModal from 'components/common/ConfirmModal';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openConfirmModal, closeConfirmModal } from 'reducers/modal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';


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
  isEditing?: boolean;
  isAdmin: number;
}

const backendUrl = process.env.REACT_APP_BACKEND_ADDRESS;

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editingComment, setEditingComment] = useState<{ [commentId: number]: string }>({});
  const navigate = useNavigate(); // useNavigate hook을 가져옵니다.
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();
  const loginUserEmail = useSelector((state: RootState) => state.user.email);
  const loginUserIsAdmin = useSelector((state: RootState) => state.user.isAdmin);
  
  // 댓글 생성 api 연결
  const addComment = async () => {
    try {
      const response = await axios.post(`${backendUrl}/comments/${id}`, { 
        comment: newComment,
      }, {withCredentials: true});
        // 최신 댓글일수록 밑에 쌓임   
        setComments([...comments, response.data]);
        setNewComment('');
      
    } catch (error) {
      console.error(error);
    }
  };

  // 댓글 수정 api 연결
  const editComment = async (commentId: number, content: string) => {
    try {
      const response = await axios.patch(`${backendUrl}/comments/${id}`, { 
        updatedContent: content,
        commentId: commentId,
        
      }, {withCredentials: true});
      
      console.log(response.data);
      
      setComments(comments.map(c => c.id === commentId ? {...c, content: response.data.content, isEditing: false} : c));
      setEditingComment({ ...editingComment, [commentId]: '' });
      
    } catch (error) {
      console.error(error);
    }
  };

  // 댓글 삭제 api 연결
  // 관리자가 아닌 경우 자신이 작성한 댓글만 삭제할 수 있다.
  const deleteComment = async (commentId: number) => {
    try {
      const url = loginUserIsAdmin ? 
      `${backendUrl}/comments/admin/${id}/${commentId}` :
      `${backendUrl}/comments/${id}/${commentId}`;

      const response = await axios.delete(url, 
        {withCredentials: true},);
      console.log(response);
      if (response.status === 200) { // 서버에서 성공적으로 응답을 받았다면
        setComments(comments.filter(c => c.id !== commentId)); // 삭제된 댓글을 제외하고 상태를 업데이트합니다.
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 상세 게시물 조회 api 연결 및 댓글 조회 api 연결
  useEffect(() => {
    console.log("run");
    const fetchPost = async () => {
      const response = await axios.get(`${backendUrl}/posts/${id}`,{withCredentials: true});
      setPost(response.data.postData);
      setComments(response.data?.commentsData?.filter((comment: Comment) => comment.post_id === Number(id)));
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
      const response = await axios.delete(`${backendUrl}/posts/${id}`,{withCredentials: true});
      if(response.status === 200) {
        dispatch(closeConfirmModal());
        navigate("/post/free");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // 댓글 내용 업데이트
  const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
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
      <div className={styles.imgPosition}>
        {post.images.map((image:any, index:any) => (
          <img key={index} src={`http://localhost:5000/${image}`} alt={`post-${index}`} />
        ))}
      </div>
      <div className={styles.updateAndDeleteBtn}>
        {(post.email === loginUserEmail) && (
          <>
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
          </>
        )}
        {loginUserIsAdmin && post.email !== loginUserEmail && (
          <div>
            {isConfirmModalOpen && (
              <ConfirmModal
                modalMessage='게시물을 삭제하시겠습니까?'
                modalController={modalController}
              />
            )}
            <button className={styles.deleteBtn} onClick={handleOpenModal}>삭제</button>
          </div>
        )}
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
                {/* 댓글 수정 */}
                {comment.isEditing ? (
                  <input
                    type="text"
                    value={editingComment[comment.id]}
                    onChange={(e) => setEditingComment({ ...editingComment, [comment.id]: e.target.value })}
                    placeholder="댓글을 수정해주세요."
                  />
                ) : (
                  <p>{comment.content}</p>
                )}
              </div>
              <div className={styles.updateBtnPosition}>
                {/* 댓글 삭제 버튼 및 수정 버튼 */}
                <div className={styles.commentUpdateBtn}>
                  {comment.author_email === loginUserEmail ? (
                    comment.isEditing ? (
                      <button onClick={() => editComment(comment.id, editingComment[comment.id])}>확인</button>
                    ) : (
                      <div>
                        <button
                          onClick={() => {
                            setComments(comments.map(c => c.id === comment.id ? {...c, isEditing: true} : c));
                            setEditingComment({ ...editingComment, [comment.id]: comment.content });
                          }}
                        >
                          수정
                        </button>
                        <button className={styles.commentDeleteBtn} onClick={() => deleteComment(comment.id)}>삭제</button>
                      </div>
                    )
                  ) : null}
                  {loginUserIsAdmin && comment.author_email !== loginUserEmail && (
                    <div>
                      <button className={styles.commentDeleteBtn} onClick={() => deleteComment(comment.id)}>삭제</button>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.createdAt}>
                <p>{convertStringToDate(comment.created_at)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 댓글 추가 */}
      <div className={styles.addComments}>
        <img src="/images/rabbit_profile.png" className={styles.commentProfileImage} />
        <div className={styles.inputAndBtn}>
          <input
              type="text"
              value={newComment}
              onChange={handleNewCommentChange}
              placeholder="댓글을 입력해주세요."
          />
          <button className={styles.addCommentBtn} onClick={addComment}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
