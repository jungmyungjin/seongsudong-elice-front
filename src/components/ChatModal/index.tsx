import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import Loading from '../common/Loading';

import useOnlineStatus from 'hooks/useOnlineStatus';

import {
  addChat,
  setChatRoomDetailChatList,
  setOnlineEmailList,
} from 'reducers/chat';

import { IChatMessage, emailList } from 'types/chat';
import {
  getCustomDateString,
  getPrevDateString,
  stringToTime,
} from 'utils/convertDate';
import styles from './chatModal.module.scss';

import { io } from 'socket.io-client';

function ChatModal() {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const dispatch = useAppDispatch();
  const { chatList } = useAppSelector(state => state.chat.chatRoomDetail);
  const chatRoomDetail = useAppSelector(state => state.chat.chatRoomDetail);

  const socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}`, {
    reconnection: false,
    path: '/socket.io/',
    transports: ['websocket'],
  });

  /****************** 소켓 위해 지정한 관리자 이메일 *****************/
  const adminEmail = 'elliseusobanggwan@gmail.com';
  const userEmail = useAppSelector(state => state.user.email);
  const isOnline = useOnlineStatus(userEmail);
  /***********************************************************************/

  /****************************** 자동 스트롤 *******************************/
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  /***********************************************************************/

  /********* 채팅방 첫 입성시 어드민 상태, 날짜, 소켓 연결, 해당방의 채팅 리스트 *********/
  useEffect(() => {
    if (userEmail === adminEmail)
      setModalTitle(`[${chatRoomDetail.generation}] ${chatRoomDetail.name}`);
    else setModalTitle('1:1 문의 채팅방');

    enterChatRoom();
    return () => {
      socket.off('enterChatRoom');
      socket.off('AllMessages');
    };
  }, [chatRoomDetail.email, userEmail, adminEmail, dispatch]);
  /***********************************************************************/

  useEffect(() => {
    onMessage();
    getOnline();
    return () => {
      socket.off('message');
      socket.off('latestMessage');
      socket.off('onlineStatus');
    };
  }, [addChat, setOnlineEmailList]);

  /************************** 채팅 보내기 관련 함수 *****************************/
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  function handleSend() {
    if (inputValue.trim().length === 0) {
      return;
    }
    sendMessage(inputValue);
    sendOnline();
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
    if (userEmail === adminEmail) {
      socket.emit('enterChatRoom', chatRoomDetail.email);
    } else {
      socket.emit('enterChatRoom', userEmail);
    }
    socket.on('AllMessages', data => {
      dispatch(setChatRoomDetailChatList(data));
      if (!data) {
        socket.emit('createChatRoom', userEmail);
      }
    });
  }

  function sendMessage(message: string) {
    if (userEmail === adminEmail) {
      socket.emit('message', chatRoomDetail.email, adminEmail, message);
    } else {
      socket.emit('message', userEmail, userEmail, message);
    }
  }

  function onMessage() {
    socket.on('latestMessage', (data: IChatMessage[]) => {
      console.log('latestMessage: ', data);
      const newChatMessage = {
        sender_email: data[0].sender_email,
        name: data[0].name,
        generation: data[0].generation,
        message: data[0].message,
        sentAt: data[0].sentAt,
      };
      dispatch(addChat({ chatMessage: newChatMessage }));
    });
  }

  function sendOnline() {
    if (userEmail === adminEmail) {
      socket.emit('isOnlineStatus', chatRoomDetail.email, adminEmail);
    } else {
      socket.emit('isOnlineStatus', userEmail, adminEmail);
    }
  }

  function getOnline() {
    socket.on('onlineStatus', (data: emailList[]) => {
      dispatch(setOnlineEmailList(data));
    });
  }

  /***********************************************************************/

  return (
    <FullModal title={modalTitle} modalType='chat'>
      <div className={styles.chatModalContainer}>
        <div className={styles.scrollContainer}>
          {userEmail !== adminEmail && <AdminProfile isOnline={isOnline} />}

          <div className={styles.chatListContainer}>
            {chatList !== null ? (
              chatList?.length > 0 ? (
                chatList?.map((msg, i) => {
                  const currentDate = getPrevDateString(msg.sentAt);
                  const formattedDate =
                    i === 0 ||
                    currentDate !== getPrevDateString(chatList[i - 1]?.sentAt)
                      ? getCustomDateString(msg.sentAt)
                      : '';

                  return (
                    <div key={i}>
                      {formattedDate && (
                        <div className={styles.nowDate}>{formattedDate}</div>
                      )}
                      <ChatMessage
                        key={i}
                        sender_email={msg.sender_email}
                        name={msg.name}
                        generation={msg.generation}
                        message={msg.message}
                        sentAt={stringToTime(msg.sentAt)}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={styles.loadingContainer}>
                  {chatList !== null ? <Loading /> : <></>}
                </div>
              )
            ) : (
              <></>
            )}
            <div ref={scrollContainerRef} />
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
