import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './createPost.module.scss';
import darkStyles from './createPostDark.module.scss';
import { ReactComponent as Back } from 'assets/Back.svg';
import { ReactComponent as UploadIcon } from 'assets/Upload.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import Loading from 'components/common/Loading';

interface FormInput {
  title: string;
  body: string;
  file: FileList;
}

const backendUrl = process.env.REACT_APP_BACKEND_ADDRESS;

const CreatePost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<FileList | null>(null); // New line
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const selectedTab = location.state?.selectedTab || '자유';
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 이미지 url들을 저장할 state

  const onFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormInput) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.body);
      if (uploadedFile && uploadedFile?.length > 0) {
        for (let i = 0; i < uploadedFile.length; i++) {
          formData.append('file', uploadedFile[i]);
        }
      }

      const category = selectedTab === '자유' ? '자유게시판' : '공지게시판';
      formData.append('category', category);
      const response = await axios.post(`${backendUrl}/posts/write`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      // console.log(response);
      if (response.status === 201) {
        navigate(-1);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 파일 인풋 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register('file').onChange(e);

    if (e.target.files) {
      setUploadedFile(e.target.files);

      // 추가된 코드 - 파일들을 URL로 변환하여 저장
      const fileUrls = Array.from(e.target.files).map(file =>
        URL.createObjectURL(file),
      );
      setPreviewUrls(fileUrls);
    }
  };

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={styles['create-post-container']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.buttonContainer}>
          {/* 뒤로 가기 버튼 */}
          <button type='button' onClick={() => navigate(-1)}>
            <Back />
          </button>
          <button
            type='submit'
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : '완료'}
          </button>
        </div>
        <div className={styles['form-group']}>
          <input
            id='title'
            className={`${styles.titleInput} ${
              errors.title ? styles.errorInput : ''
            }`}
            placeholder='제목을 입력하세요.'
            {...register('title', { required: true })}
          />
          {errors.title && (
            <span className={styles.errorMessage}>
              제목은 필수 입력 항목입니다.
            </span>
          )}
        </div>
        <div className={styles['form-group']}>
          <input
            id='body'
            className={`${styles.bodyInput} ${
              errors.body ? styles.errorInput : ''
            }`}
            placeholder='내용을 입력하세요.'
            {...register('body', { required: true })}
          />
          {errors.body && (
            <span className={styles.errorMessage}>
              내용은 필수 입력 항목입니다.
            </span>
          )}
        </div>
        {/* 파일 업로드 */}
        <div className={selectedStyles.fileUpload}>
          <UploadIcon onClick={onFileButtonClick} />
          <input
            id='file'
            type='file'
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* 추가된 코드 - 이미지 미리보기 */}
        <div className={styles.imagePreviewContainer}>
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt='preview'
              className={styles.imagePreview}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
