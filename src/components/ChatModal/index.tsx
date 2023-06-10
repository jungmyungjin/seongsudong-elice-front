import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import { addChat, setChatRoomDetail } from 'reducers/chat';
import { online } from 'actions/access';

import { IChatMessage } from 'types/chat';
import { convertDate, chatTime } from 'utils/convertDate';
import styles from './chatModal.module.scss';

/* 소켓 객체 */
import { io } from 'socket.io-client';

function ChatModal() {
  const [modalTitle, setModalTitle] = useState<string>('');
  // const {isAdmin} = useAppSelector(state => state.user); // 임의 -> 로그인 성공 후 전역으로 isAdmin 저장 성공 시 주석 해제
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // 임의 ~> 추후 로그인하고 res값으로 받은 admin boolean값 전역에 저장해주세요
  const [isOnline, setIsOnline] = useState<boolean>(true); // 임의 ~> 채팅 페이지에 머물러 있을 때 vs 로그인 했을 때 vs 사이트 창에 머물러 있을 때  기준 정해야함
  const [inputValue, setInputValue] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const dispatch = useAppDispatch();
  const { chatList } = useAppSelector(state => state.chat.chatRoomDetail);
  const chatRoomDetail = useAppSelector(state => state.chat.chatRoomDetail);

  /** 소켓 테스트 위해 임의로 설정한 유저 이메일 */
  const userEmail = localStorage.getItem('email');

  /** 자동 스크롤 */
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  /** socket선언은 꼭꼭 사용하는 컴포넌트 내에서 선언해야 인식을 한다. */

  const socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}`);

  useEffect(() => {
    if (scrollContainerRef.current && chatList?.length > 0) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  /** 어드민 여부 */
  useEffect(() => {
    if (userEmail === 'yunzoo0915@gmail.com') {
      setIsAdmin(true);
    }
    const onlineUserList = ['test1@example.com', 'email2@gmail.com'];
    // onlineUserList.find(user => user === sender_email)
    //   ? setIsOnline(true)
    //   : setIsOnline(false);
  }, []);

  /** 채팅방 첫 입성시 위에 제목, 날짜 결정 */
  useEffect(() => {
    console.log('채팅방 입장:', chatRoomDetail);
    socket.on('connect', () => {
      console.log('소켓 연결 성공');
    });
    setDate(convertDate(new Date()));
    /** 전역으로 관리되는 유저 정보 가져와서 분기 실행 */
    if (isAdmin)
      setModalTitle(`[${chatRoomDetail.generation}] ${chatRoomDetail.name}`);
    else setModalTitle('1:1 문의 채팅방');
  }, [chatRoomDetail, isAdmin, chatList]);

  /** 모든 메세지 받는 */
  socket.off('AllMessages').on('AllMessages', data => {
    console.log(data);
    // dispatch(addChat({ chatMessage: newOtherChat }));
  });

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  function handleSend() {
    if (inputValue.trim().length === 0) {
      return;
    }
    socket.emit('checkChatRoom', userEmail, inputValue);
    // 소켓에서 받아온 메세지 형태가 아래와 같음.
    const newMyChat = {
      sender_email: userEmail, // 현재 로그인한 유저
      name: chatRoomDetail.name, // 룸 디테일에 저장된 이름
      generation: chatRoomDetail.generation, // 룸 디테일에 저장된 제네레이션
      message: inputValue, // 메세지
      sentAt: chatTime(new Date()), // 시간
    };

    dispatch(addChat({ chatMessage: newMyChat }));

    setInputValue('');
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <FullModal title={modalTitle} modalType='chat'>
      <div className={styles.chatModalContainer}>
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          {!isAdmin && <AdminProfile isOnline={isOnline} />}
          <div className={styles.nowDate}>{date}</div>
          <div className={styles.chatListContainer}>
            {chatList?.map((msg, i) => (
              <ChatMessage
                key={i}
                sender_email={msg.sender_email}
                name={msg.name}
                generation={msg.generation}
                message={msg.message}
                sentAt={msg.sentAt}
              />
            ))}
          </div>
        </div>
        <div className={styles.chatInputContainer}>
          <ChatInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleClick={handleSend}
            handleEnter={handleEnter}
          />
        </div>
      </div>
    </FullModal>
  );
}

export default ChatModal;
