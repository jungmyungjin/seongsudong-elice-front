import React from 'react';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/elice-logo.png';
import axios from 'axios';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { logIn } from 'reducers/user';

const api =
  process.env.REACT_APP_BACKEND_ADDRESS + '/api/members/register' || '';

const Login = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // [ Authorization Code Flow 방식 ]
  const loginBtnHandle = useGoogleLogin({
    onSuccess: async (data: any) => {
      try {
        // console.log(data);
        const res = await axios.post(api, data);
        // console.log('useGoogleLogin', res);

        if (res.status === 200) {
          // 백엔드에서 받아온 토큰 값
          localStorage.setItem('token', JSON.stringify(res.data));
          navigate('/');
        } else if (res.status === 204) {
          // 회원가입이 안된 사용자, 회원가입 페이지로 리디랙션
          navigate('/signUp');
        } else {
          console.log('status error : ' + res.status);
        }
      } catch (error) {
        console.log(error);
        alert('서버와 정상적으로 통신할 수 없습니다.');
      }
      // console.log(data);
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
            <img src='/images/google_G_logo.svg.png' alt='구글 로그' />
            <span>구글 계정으로 로그인</span>
          </div>
        </button>
        <GoogleLogin
          onSuccess={async credentialResponse => {
            try {
              const res = await axios.get(api, {
                headers: {
                  Authorization: `Bearer ${credentialResponse.credential}`,
                },
              });
              if (res.status === 200) {
                // 백엔드에서 받아온 토큰 값
                localStorage.setItem(
                  'token',
                  credentialResponse.credential || '',
                );
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
              alert('서버와 정상적으로 통신할 수 없습니다.');
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
};

export default Login;
