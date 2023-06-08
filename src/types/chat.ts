export interface IChat {
  chatList: IChatMessage[];
  loadChatLoading: boolean;
  loadChatDone: boolean;
  loadChatError: null | string;
  chatRoomList: IChatRoom[];
  chatRoomDetail: IChatRoom;
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
}
