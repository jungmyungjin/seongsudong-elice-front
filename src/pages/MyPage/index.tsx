import CustomLink from 'components/common/Link';
import styles from './myPage.module.scss';
import { useAppSelector } from 'hooks/useRedux';

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
  const { username, course, generation } = useAppSelector(state => state.user);

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.header}>
        <div className={styles.headerImage}>
          <img src='/images/rabbit_profile.png' alt='profile' />
        </div>
        <div className={styles.myName}>
          [{course}/{generation}] {username}
        </div>
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
