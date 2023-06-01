import { useEffect } from 'react';
import { shareKakao } from './shareKakao';

import { ReactComponent as KakaoIcon } from 'assets/Kakao.svg';
import styles from './kakaoShareButton.module.scss';

const { Kakao } = window;

function KakaoShareButton() {
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
    console.log(Kakao.isInitialized());
    console.log(Kakao);
  }, []);

  const description = 'hi\nmy name is\nhayeong';
  return (
    <>
      <button
        type='submit'
        className={styles.kakaoButton}
        onClick={() => shareKakao(description)}
      >
        <div className={styles.KakaoShareText}>
          <KakaoIcon />
          <p>카카오톡 공유하기</p>
        </div>
      </button>
    </>
  );
}

export default KakaoShareButton;
