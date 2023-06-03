import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './createPost.module.scss';
import { ReactComponent as Back } from 'assets/Back.svg';
import { ReactComponent as UploadIcon } from 'assets/Upload.svg';

interface FormInput {
  title: string;
  body: string;
  file: FileList;
}

const CreatePost: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const onFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const file = watch('file'); // file 필드의 변화를 감시합니다.

  const onSubmit = async (data: FormInput) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      if (file?.length > 0) {
        formData.append('file', file[0]);
      }

      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={styles['create-post-container']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.buttonContainer}>
          {/* 뒤로 가기 버튼 */}
          <button type="button" onClick={() => navigate(-1)}>
            <Back />
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? '게시글 생성 중...' : '완료'}
          </button>
        </div>
        <div className={styles['form-group']}>
          <input 
            id="title" 
            className={`${styles.titleInput} ${errors.title ? styles.errorInput : ''}`}
            placeholder="제목을 입력하세요." 
            {...register('title', { required: true })}
          />
          {errors.title && <span className={styles.errorMessage}>제목은 필수 입력 항목입니다.</span>}
        </div>
        <div className={styles['form-group']}>
          <input 
            id="body" 
            className={`${styles.bodyInput} ${errors.body ? styles.errorInput : ''}`}
            placeholder="내용을 입력하세요." 
            {...register('body', { required: true })}
          />
          {errors.body && <span className={styles.errorMessage}>내용은 필수 입력 항목입니다.</span>}
        </div>
        {/* 파일 업로드 */}
        <div className={styles.fileUpload}>
          <UploadIcon onClick={onFileButtonClick} />
          <input id="file" type="file" ref={fileInputRef} onChange={e => register('file').onChange(e)} style={{ display: 'none' }} />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
