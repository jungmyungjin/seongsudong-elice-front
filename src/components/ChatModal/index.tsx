import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import { addChat, setChatRoomDetailChatList } from 'reducers/chat';

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

  /** 소켓 객체 선언 */
  const socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}`);

  /****************** 소켓 테스트 위해 임의로 설정한 유저 이메일 *****************/
  const userEmail = localStorage.getItem('email');
  const adminEmail = 'yunzoo0915@gmail.com';
  if (userEmail === adminEmail) {
    setIsAdmin(true);
  }
  /***********************************************************************/

  /****************************** 자동 스트롤 *******************************/
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current && chatList?.length > 0) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatList]);
  /***********************************************************************/

  /********************** 채팅방 첫 입성시 날짜, 소켓 연결 *************************/
  useEffect(() => {
    console.log('채팅방 입장:', chatRoomDetail);
    setDate(convertDate(new Date()));

    /** 소켓 연결 코드 */
    socket.on('connect', () => {
      console.log('소켓 연결 성공');
    });

    enterChatRoom();

    /** 소켓 끊김 코드 */
    return () => {
      socket.disconnect();
    };
  }, []);
  /***********************************************************************/

  /********************** 어드민 분기에 따른 채팅방 제목 설정 *************************/
  useEffect(() => {
    /** 전역으로 관리되는 유저 정보 가져와서 분기 실행 */
    if (isAdmin)
      setModalTitle(`[${chatRoomDetail.generation}] ${chatRoomDetail.name}`);
    else setModalTitle('1:1 문의 채팅방');
  }, [chatRoomDetail, isAdmin]);
  /***************************************************************************/

  /************************** 채팅 보내기 관련 함수 *****************************/
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  function handleSend() {
    if (inputValue.trim().length === 0) {
      return;
    }
    createChatRoom();
    message();
    getOnline();
    setInputValue('');
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  /***************************************************************************/

  /***************************** 소켓 관련 함수 코드임 ***************************/
  function enterChatRoom() {
    if (isAdmin) {
      socket.emit('enterChatRoom', chatRoomDetail.email);
    } else {
      socket.emit('enterChatRoom', userEmail);
    }

    socket.on('AllMessages', data => {
      console.log('AllMessages', data);
      dispatch(setChatRoomDetailChatList(data));
    });
  }

  function createChatRoom() {
    if (chatList.length < 1 && !isAdmin) {
      socket.emit('createChatRoom', userEmail, inputValue);
    }
  }

  function message() {
    if (isAdmin) {
      socket.emit('message', adminEmail, chatRoomDetail.email, inputValue);
    } else {
      socket.emit('message', userEmail, userEmail, inputValue);
    }
    socket.off('message').on('message', data => {
      dispatch(addChat({ chatMessage: data }));
      console.log(data);
    });
  }

  function getOnline() {
    socket.emit('isOnline');
    socket.off('isOnline').on('isOnline', data => {
      console.log(data);
    });
  }
  /***********************************************************************/

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
