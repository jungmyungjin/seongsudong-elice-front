import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import {
  addChat,
  setChatRoomDetail,
  setChatRoomDetailChatList,
} from 'reducers/chat';
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
  const adminEmail = 'yunzoo0915@gmail.com';

  /** 보내는 이메일 잘 생각해야해 > 로그인한 유저가 관리자면 보내는 이메일은 채팅방의 상대방 이메일을 보내야하고,
   * 로그인한 유저가 일반 유저면 보내는 이메일은 현재 로그인한 유저의 이메일임 */

  /** 자동 스크롤 */
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  /** socket선언은 꼭꼭 사용하는 컴포넌트 내에서 선언해야 인식을 한다. */

  const socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}`);

  /** 자동 스크롤 */
  useEffect(() => {
    if (scrollContainerRef.current && chatList?.length > 0) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  /** 채팅방 첫 입성시 날짜, 어드민 여부 */
  useEffect(() => {
    if (userEmail === adminEmail) {
      setIsAdmin(true);
    }
    console.log('채팅방 입장:', chatRoomDetail);
    setDate(convertDate(new Date()));

    /** 소켓 연결 코드 */
    socket.on('connect', () => {
      console.log('소켓 연결 성공');
    });

    /**
     * -> 프론트에서 보낼 인자값
     * 첫번째 인자 = 엘리서, 두번째 인자 = 관리자
     */
    if (isAdmin) {
      socket.emit('enterChatRoom', chatRoomDetail.email, adminEmail);
    } else {
      socket.emit('enterChatRoom', userEmail, adminEmail);
    }

    socket.on('AllMessages', data => {
      console.log('AllMessages', data);
      dispatch(setChatRoomDetailChatList(data));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  /** 어드민 분기 실행*/
  useEffect(() => {
    /** 전역으로 관리되는 유저 정보 가져와서 분기 실행 */
    if (isAdmin)
      setModalTitle(`[${chatRoomDetail.generation}] ${chatRoomDetail.name}`);
    else setModalTitle('1:1 문의 채팅방');
  }, [chatRoomDetail, isAdmin]);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  /** 채팅 보내는 이벤트 */
  function handleSend() {
    if (inputValue.trim().length === 0) {
      return;
    }

    /** 채팅 리스트 길이가 0이면 > createChatRoom
     * 채팅 리스트가 있으면 > message
     * -> 프론트에서 보낼 인자값
     * 첫번째 인자 = 엘리서, 두번째 인자 = 관리자
     */

    if (chatList.length < 1) {
      if (isAdmin) {
        socket.emit(
          'createChatRoom',
          chatRoomDetail.email,
          adminEmail,
          inputValue,
        );
      } else {
        socket.emit('createChatRoom', userEmail, adminEmail, inputValue);
      }
      socket.off('message').on('message', data => {
        dispatch(addChat({ chatMessage: data }));
        console.log(data);
      });
    } else {
      if (isAdmin) {
        socket.emit('message', chatRoomDetail.email, adminEmail, inputValue);
      } else {
        socket.emit('message', userEmail, adminEmail, inputValue);
      }
      socket.off('message').on('message', data => {
        dispatch(addChat({ chatMessage: data }));
        console.log(data);
      });
    }

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
