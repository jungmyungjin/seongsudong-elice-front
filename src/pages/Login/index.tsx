import React, { useMemo } from 'react';
import styles from './login.module.scss';
import darkStyles from './loginDark.module.scss';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/elice-logo.png';
import axios from 'axios';
import { useGoogleLogin, CodeResponse } from '@react-oauth/google';
import { AppDispatch, RootState } from 'store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'reducers/user';
import { online } from 'actions/access';

interface ResponseType {
  headers: {
    authorization: string;
  };
  token: string;
  status: number;
  data: {
    isAdmin: number;
    name: string;
    email: string;
    generation: string;
    token: string;
  };
}

const Login = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // [ Authorization Code Flow 방식 ]
  const loginBtnHandle = useGoogleLogin({
    onSuccess: async (code: CodeResponse) => {
      const api =
        process.env.REACT_APP_BACKEND_ADDRESS + '/members/login' || '';
      try {
        const response: ResponseType = await axios.post(api, code, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const { isAdmin, email, name, generation } = response.data;

          dispatch(
            logIn({
              isAdmin: isAdmin === 1 ? true : false,
              email: email,
              username: name,
              course: generation.split('/')[0],
              generation: generation.split('/')[1],
            }),
          );
          dispatch(online(email));
          navigate('/');
        } else if (response.status === 201) {
          // 회원가입이 안된 사용자, 회원가입 페이지로 리디랙션
          const { email } = response.data;

          navigate('/signUp', {
            state: { email },
          });
        } else {
          console.log('status error : ' + response.status);
        }
      } catch (error) {
        console.error('Login Error: ', error);
      }
    },
    onError: errorResponse => {
      console.error('Google Login Error: ', errorResponse);
    },

    flow: 'auth-code',
  });

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={styles.LoginLayout}>
      <div>
        <div className={styles.LoginImg}>
          <img src={logo} alt='엘리스 로고' />
          <div>
            <span className={selectedStyles.welcomeText}>
              레이서 여러분 오늘도 화이팅!
            </span>
          </div>
        </div>
        <button className={styles.LoginButton} onClick={loginBtnHandle}>
          <div>
            <img src='/images/google_G_logo.svg.png' alt='구글 로그인' />
            <span>구글 계정으로 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
