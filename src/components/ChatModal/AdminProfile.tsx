import { useSelector } from 'react-redux';
import styles from './adminProfile.module.scss';
import darkStyles from './adminProfileDark.module.scss';
import { RootState } from 'store/configureStore';
import { useMemo } from 'react';

interface AdminProfileProps {
  isOnline: boolean;
}

/** AdminProfile은 props로 관리 */
function AdminProfile({ isOnline }: AdminProfileProps) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={selectedStyles.adminProfile}>
      <div className={selectedStyles.adminSquare}>
        <img src='/images/rabbit.png' alt='admin' />
      </div>
      <div className={selectedStyles.adminName}>
        성수동 소방관
        <div className={isOnline ? selectedStyles.isOnline : ''} />
      </div>
      <p className={selectedStyles.adminProfileText}>
        궁금한 점은 언제든지 문의해주세요.
      </p>
    </div>
  );
}

export default AdminProfile;
