import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/useRedux';

function useOnlineStatus(senderEmail: string | null) {
  const [isOnline, setIsOnline] = useState(false);
  const adminEmail = 'elliseusobanggwan@gmail.com';

  const userEmail = useAppSelector(state => state.user.email);
  const getEmailList = useAppSelector(state => state.chat.onlineList);

  useEffect(() => {
    const standardArray = [
      { member_email: senderEmail },
      { member_email: adminEmail },
    ];

    let isUserOnline = false;
    let isAdminOnline = false;

    getEmailList.forEach(item => {
      if (item.member_email === standardArray[0].member_email) {
        isUserOnline = true;
      }
      if (item.member_email === standardArray[1].member_email) {
        isAdminOnline = true;
      }
    });

    if (userEmail !== adminEmail) {
      setIsOnline(isAdminOnline);
    } else {
      setIsOnline(isUserOnline);
    }
  }, [userEmail, senderEmail, adminEmail, getEmailList]);

  return isOnline;
}

export default useOnlineStatus;
