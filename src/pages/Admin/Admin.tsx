import React from 'react';

import CustomLink from 'components/common/Link';
import { ReactComponent as Logo } from 'assets/Logo.svg';
import styles from './Admin.module.scss';

const menuArr = [
  {
    id: 1,
    to: 'chat',
    icon: 'chat',
    title: '레이서 문의 관리',
    right: true,
  },
  {
    id: 2,
    to: 'notice',
    icon: 'notice',
    title: '공지사항 관리',
    right: true,
  },
  {
    id: 3,
    to: 'booking',
    icon: 'booking',
    title: '예약 관리',
    right: true,
  },
];

function Admin() {
  return (
    <div>
      <div className={styles.logo_div}>
        {/* 텍스트로 변경하자!! */}
        <Logo />
      </div>

      {menuArr.map(item => (
        <CustomLink
          key={item.id}
          to={item.to}
          title={item.title}
          icon={item.icon}
          right={item.right}
        />
      ))}
    </div>
  );
}

export default Admin;
