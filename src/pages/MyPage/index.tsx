import CustomLink from 'components/common/Link';
import styles from './myPage.module.scss';

const myPageMenu = [
  {
    id: 1,
    to: 'myreservation',
    icon: 'calendar',
    title: '예약 조회',
    right: true,
  },
  {
    id: 2,
    to: 'mypost',
    icon: 'post',
    title: '내가 쓴 게시물',
    right: true,
  },
];

function MyPage() {
  // 원래는 useAppSelecter로 가져와야함
  interface MyPageProps {
    userName: string;
  }

  const initValue: MyPageProps = {
    userName: '[SW]신하영',
  };

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.header}>
        <div className={styles.headerImage}>
          <img src='/images/rabbit_profile.png' alt='profile' />
        </div>
        <div className={styles.myName}>{initValue.userName}</div>
      </div>
      <div className={styles.myPageMenuContainer}>
        {myPageMenu.map(item => (
          <CustomLink
            key={item.id}
            to={item.to}
            title={item.title}
            icon={item.icon}
            right={item.right}
          />
        ))}
      </div>
    </div>
  );
}
export default MyPage;
