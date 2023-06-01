import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './postUpdate.module.scss';
import { ReactComponent as Back } from 'assets/Back.svg';
import { ReactComponent as UploadIcon } from 'assets/Upload.svg';
import postsData from './postsData.json';

interface Post {
  id: number;
  title: string;
  description: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const onFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 더미 데이터 테스트
  useEffect(() => {
    const fetchPost = () => {
      let storedData = localStorage.getItem('postsData');
      if (storedData === null) {
        localStorage.setItem('postsData', JSON.stringify(postsData));
        storedData = localStorage.getItem('postsData');
      }
      const parsedData = JSON.parse(storedData!);
      const response = parsedData.find((post: Post) => post.id === Number(id));

      if (!response) {
        console.error('Post not found');
        return;
      }
      
      setPost(response);
      setTitle(response.title);
      setDescription(response.description);
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
    setImage(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    
    let storedData = localStorage.getItem('dummyData');
    const parsedData = JSON.parse(storedData!);
    const postIndex = parsedData.findIndex((post: Post) => post.id === Number(id));
    parsedData[postIndex] = { ...parsedData[postIndex], title: title, description: description };
    localStorage.setItem('dummyData', JSON.stringify(parsedData));
    
    navigate(`/post/free/${id}`);
  };




  // api 테스트
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
  //     setPost(response.data.postData);
  //     setTitle(response.data.postData.title);
  //     setDescription(response.data.postData.description);
  //   };

  //   fetchPost();
  // }, [id]);

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };

  // const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setDescription(event.target.value);
  // };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImage(event.target.files ? event.target.files[0] : null);
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   // FormData를 사용하여 업로드된 이미지 파일과 수정된 제목 및 본문을 서버에 전송
  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('description', description);
  //   if (image) {
  //     formData.append('image', image);
  //   }

  //   await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     }
  //   });
  //   navigate(`/post/free/${id}`); // 수정 후 게시물 상세 페이지로 이동
  // };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.updateBtn}>
        <button type="button" onClick={handleBack}>
          <Back />
        </button>
        <button type="submit">
          <p>제출</p>
        </button>
      </div>
      <input type="text" className={styles.titleChange} value={title} onChange={handleTitleChange} />
      <textarea className={styles.descriptionChange} value={description} onChange={handleBodyChange} />
      <div className={styles.uploadIcon}>
        <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
        <button type="button" onClick={onFileButtonClick}>
          <UploadIcon />
        </button>
      </div>
    </form>
  );
};

export default EditPost;
