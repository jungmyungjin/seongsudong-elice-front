import React from 'react';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/elice-logo.png';
import axios from 'axios';

const Login = (): React.ReactElement => {
  let navigate = useNavigate();

  const loginBtnHandle = async () => {
    const backendAddress = 'http://localhost:5000';
    const api = `${backendAddress}/`; // 백엔드 api 주소

    try {
      const res = await axios.get(api);
      if (res.status === 200) {
        // 회원가입 된 사용자 => 페이지를 메인으로 리디릭션 혹은 라우팅
        navigate('/');
      } else if (res.status === 204) {
        // 회원가입 되지 않은 사용자 => 회원가입 페이지로 리디렉션 혹은 라우팅
        navigate('/signUp');
      } else {
      }
    } catch (err) {
      console.log(err);
      alert('서버와 정상적으로 통신할 수 없습니다.');
      navigate('/');
    }
  };

  return (
    <div className={styles.LoginLayout}>
      <div>
        <div className={styles.LoginImg}>
          <img src={logo} alt='엘리스 로고' />
          <div>
            <span>레이서 여러분 오늘도 화이팅!</span>
          </div>
        </div>
        <button className={styles.LoginButton} onClick={loginBtnHandle}>
          <div>
            <img src='/images/google_G_logo.svg.png' alt='구글 로그' />
            <span>구글 계정으로 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
