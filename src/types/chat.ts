export interface IChat {
  loadChatLoading: boolean;
  loadChatDone: boolean;
  loadChatError: null | string;
  chatRoomList: IChatRoom[]; // 채팅방 리스트 저장
  chatRoomDetail: IChatRoom; // 채티방 리스트를 눌렀을 때 id를 통해 chatRoomDetail에 해당 채팅방 정보 저장
}

export interface IChatMessage {
  chatFromMe: boolean; // true 임시 고정
  chatMessage: string;
  sentTime: string;
  isOnline?: boolean; // 내가 보낸 메세지 온라인 표시 안해도 됨
  fromName?: string; // 내가 보낸 메세지면 이름이 없어도 됨
}
export interface IChatInput {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClick: () => void;
  handleEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export interface IChatRoom {
  roomId: number;
  memberName: string;
  adminEmail: string;
  memberEmail: string;
  createAt: string;
  chat: IRecentMessages;
  chatList: IChatMessage[];
}

export interface IRecentMessages {
  sentAt: string;
  lastSendMsg: string;
}
