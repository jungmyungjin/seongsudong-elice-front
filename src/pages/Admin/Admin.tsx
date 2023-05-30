import React from 'react';

import CustomLink from 'components/common/Link';

const menuArr = [
  {
    id: 1,
    to: '/chat',
    icon: 'chat',
    title: '레이서 문의 관리',
    right: true,
  },
  {
    id: 2,
    to: '/notice',
    icon: 'notice',
    title: '공지사항 관리',
    right: true,
  },
  {
    id: 3,
    to: '/booking',
    icon: 'booking',
    title: '예약 관리',
    right: true,
  },
];

function Admin() {
  return (
    <div>
      <div>
        <img alt='logo' src={`${process.env.PUBLIC_URL}/images/rabbit.png`} />
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
