import styles from './adminProfile.module.scss';

interface AdminProfileProps {
  isOnline: boolean;
}

/** AdminProfile은 props로 관리 */
function AdminProfile({ isOnline }: AdminProfileProps) {
  return (
    <div className={styles.adminProfile}>
      <div className={styles.adminSquare}>
        <img src='/images/rabbit.png' alt='admin' />
      </div>
      <div className={styles.adminName}>
        성수동 소방관
        <div className={isOnline ? styles.isOnline : ''} />
      </div>
      <p className={styles.adminProfileText}>
        궁금한 점은 언제든지 문의해주세요.
      </p>
    </div>
  );
}

export default AdminProfile;
