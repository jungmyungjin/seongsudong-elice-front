import React from 'react';

import CustomLink from 'components/common/Link';
import styles from './Admin.module.scss';

const menuArr = [
  {
    id: 1,
    to: 'notice',
    icon: 'notice',
    title: '공지사항 관리',
    right: true,
  },
  {
    id: 2,
    to: 'booking',
    icon: 'booking',
    title: '좌석/예약 관리',
    right: true,
  },
];

function Admin() {
  return (
    <div className={styles.admin}>
      <h1 className={styles.h1}>관리자 페이지</h1>

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
