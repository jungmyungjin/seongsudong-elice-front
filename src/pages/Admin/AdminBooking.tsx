import React from 'react';

import CustomLink from 'components/common/Link';
import styles from './AdminBooking.module.scss';

const menuArr = [
  {
    id: 1,
    to: '/admin',
    icon: 'booking',
    title: '예약 관리',
    right: false,
  },
  {
    id: 2,
    to: 'block',
    icon: 'bookmark-block',
    title: '예약 제한하기',
    right: true,
  },
  {
    id: 3,
    to: 'racer',
    icon: 'bookmark',
    title: '레이서 예약 현황 관리',
    right: true,
  },
];

function AdminBooking() {
  return (
    <div className={styles.booking}>
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

export default AdminBooking;
