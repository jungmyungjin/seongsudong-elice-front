import React, { useState, MouseEvent, useEffect, useMemo } from 'react';
import axios from 'axios';
import styles from './signUp.module.scss';
import darkStyles from './signUpDark.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import SignUpSelectBtn from 'components/SignUpSelectBtn';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

const api = process.env.REACT_APP_BACKEND_ADDRESS + '/members/register';

const SignUp = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token || '';
  const [selectCourse, setSelectCourse] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [email, setEmail] = useState('');

  const { state } = useLocation();

  useEffect(() => {
    if (!state?.email) {
      navigate('/');
      alert('잘못된 접근입니다.');
    } else {
      setEmail(state.email);
    }
  }, [state]);

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
      email,
    };
    try {
      const res = await axios.post(api, data);

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

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={styles.signUpLayout}>
      <div className={styles.greeting}>
        <div className={selectedStyles.title}>환영합니다!</div>
        <div className={styles.subTitle}>기본 회원 정보를 입력해주세요.</div>
      </div>

      <form onSubmit={handleSubmit} className={styles.inputField}>
        <div className={selectedStyles.nameField}>
          <span>이름</span>
          <input
            name='name'
            type='text'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={selectedStyles.courseField}>
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
