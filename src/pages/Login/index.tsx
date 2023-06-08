import React from 'react';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/elice-logo.png';
import axios from 'axios';
// import Cookies from 'js-cookie';
import { useGoogleLogin, CodeResponse } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { logIn } from 'reducers/user';

interface ResponseType {
  headers: {
    authorization: string;
  };
  token: string;
  status: number;
  data: {
    isAdmin: boolean;
    name: string;
    email: string;
    generation: string;
    token: string;
  };
}

const Login = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // [ Authorization Code Flow 방식 ]
  const loginBtnHandle = useGoogleLogin({
    onSuccess: async (code: CodeResponse) => {
      const api =
        process.env.REACT_APP_BACKEND_ADDRESS + '/members/login' || '';
      try {
        const response: ResponseType = await axios.post(api, code);
        if (response.status === 200) {
          const { isAdmin, email, name, generation } = response.data;
          dispatch(
            logIn({
              isAdmin: isAdmin,
              email: email,
              username: name,
              course: generation.split('/')[0],
              generation: generation.split('/')[1],
            }),
          );

          navigate('/');
        } else if (response.status === 204) {
          // 회원가입이 안된 사용자, 회원가입 페이지로 리디랙션
          navigate('/signUp');
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
            <img src='/images/google_G_logo.svg.png' alt='구글 로그인' />
            <span>구글 계정으로 로그인</span>
          </div>
        </button>
        {/* <GoogleLogin
          onSuccess={async credentialResponse => {
            try {
              const res = await axios.post(api, {
                headers: {
                  Authorization: `Bearer ${credentialResponse.credential}`,
                },
              });
              if (res.status === 200) {
                const { isAdmin, email, name, generation } = res.data;
                dispatch(
                  logIn({
                    isAdmin: isAdmin,
                    email: email,
                    username: name,
                    course: generation.split('/')[0],
                    generation: generation.split('/')[1],
                  }),
                );

                navigate('/');
              } else if (res.status === 204) {
                // 회원가입이 안된 사용자, 회원가입 페이지로 리디랙션
                navigate('/signUp', {
                  state: { token: credentialResponse.credential },
                });
              } else {
                console.log('status error : ' + res.status);
              }
            } catch (error) {
              console.log(error);
            }
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        /> */}
      </div>
    </div>
  );
};

export default Login;
