import React from 'react';
import styles from './footer.module.scss';

const Footer = (): React.ReactElement => {
  return (
    <div className={styles.footerLayout}>
      <div className={styles.footer}>
        <div>엘리스랩</div>
        <p>
          주소 : 서울 성동구 아차산로17길 48 성수낙낙 2층 엘리스랩 대표자 김재원
          | 통신판매업 신고번호 제2017-대전유성-0009호 | 직업정보제공사업
          신고번호: J1200020220004 | 사업자등록번호 581-88-00303 | 전화
          070-4633-2017 | 이메일 contact@elice.io
        </p>
        <div>
          Copyright ⓒ 2023 엘리스랩&SW4 시켜줘, 앨리스 명예소방관 팀 All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
