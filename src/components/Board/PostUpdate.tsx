import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './postUpdate.module.scss';
import { ReactComponent as Back } from 'assets/Back.svg';
import { ReactComponent as UploadIcon } from 'assets/Upload.svg';


interface Post {
  id: number;
  title: string;
  description: string;
}

const backendUrl = process.env.REACT_APP_BACKEND_ADDRESS;

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileButtonClick = () => {
    fileInputRef.current?.click();
  };


  // api 테스트
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`${backendUrl}/posts/${id}`, {withCredentials: true});
      setPost(response.data.postData);
      setTitle(response.data.postData.title);
      setDescription(response.data.postData.description);
    };

    fetchPost();
  }, [id]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files ? event.target.files : null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(title, description, image);

    // FormData를 사용하여 업로드된 이미지 파일과 수정된 제목 및 본문을 서버에 전송
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append('file', image[i]);
      }
    }

    await axios.patch(`${backendUrl}/posts/${id}`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    

    navigate(`/post/free/${id}`); // 수정 후 게시물 상세 페이지로 이동
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.updateBtn}>
        <button type='button' onClick={handleBack}>
          <Back />
        </button>
        <button type='submit'>
          <p>제출</p>
        </button>
      </div>
      <input
        type='text'
        className={styles.titleChange}
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        className={styles.descriptionChange}
        value={description}
        onChange={handleBodyChange}
      />
      <div className={styles.uploadIcon}>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
          multiple
          accept='.png, .jpeg'
        />
        <button type='button' onClick={onFileButtonClick}>
          <UploadIcon />
        </button>
      </div>
    </form>
  );
};

export default EditPost;
