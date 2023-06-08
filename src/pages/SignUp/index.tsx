import React, { useState, MouseEvent, useEffect } from 'react';
import axios from 'axios';
import styles from './signUp.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import SignUpSelectBtn from 'components/SignUpSelectBtn';

const api = process.env.REACT_APP_BACKEND_ADDRESS + '/api/members/register';

const SignUp = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token || '';
  const [selectCourse, setSelectCourse] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [classNumber, setClassNumber] = useState('');

  if (token === '') {
    alert('토큰이 없습니다.');
  }

  const courseInfo: { [key: string]: string[] } = {
    SW: [...Array(6).keys()].map(i => i + 1 + ''),
    AI: [...Array(9).keys()].map(i => i + 1 + ''),
    IoT: [...Array(1).keys()].map(i => i + 1 + ''),
  };

  useEffect(() => {
    setSelectCourse(course);
  }, [course]);

  const goBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // form 제출 방지
    const data = {
      token: token, // id_token(credential)
      name: name, // 이름
      generation: `${course}/${classNumber}`, // 기수
    };
    try {
      const res = await axios.post(api, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        navigate('/');
        // 정상 회원가입 완료
      } else {
        console.log('status error : ' + res.status);
        // console.log(res); // 서버 응답 출력
      }
      // console.log(res); // 서버 응답 출력
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.signUpLayout}>
      <div className={styles.greeting}>
        <div className={styles.title}>환영합니다!</div>
        <div className={styles.subTitle}>기본 회원 정보를 입력해주세요.</div>
      </div>

      <form onSubmit={handleSubmit} className={styles.inputField}>
        <div className={styles.nameField}>
          <span>이름</span>
          <input
            name='name'
            type='text'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.courseField}>
          <div>
            <SignUpSelectBtn
              buttonName='과정'
              buttonList={Object.keys(courseInfo)}
              onValueSelected={setCourse}
            />
          </div>
          <div>
            <SignUpSelectBtn
              buttonName='기수'
              buttonList={courseInfo[selectCourse] || []}
              onValueSelected={setClassNumber}
            />
          </div>
        </div>
        <div className={styles.resultBtns}>
          <button onClick={goBack}>이전</button>
          <button type='submit'>다음</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
