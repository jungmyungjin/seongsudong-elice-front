import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './createPost.module.scss';

interface FormInput {
  title: string;
  body: string;
}

const CreatePost: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormInput) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      if (response.status === 201) {
        // 포스트가 성공적으로 생성되면, 게시글 목록 페이지로 이동합니다.
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['create-post-container']}>
      <h1>새 게시글 생성</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['form-group']}>
            <label htmlFor="title">제목</label>
            <input id="title" {...register('title', { required: true })} />
            {errors.title && <span>제목은 필수 입력 항목입니다.</span>}
        </div>
        <div className={styles['form-group']}>
            <label htmlFor="body">내용</label>
            <textarea id="body" {...register('body', { required: true })} />
            {errors.body && <span>내용은 필수 입력 항목입니다.</span>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? '게시글 생성 중...' : '게시글 생성'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
