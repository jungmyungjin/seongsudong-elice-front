export interface IChat {
  loadChatLoading: boolean;
  loadChatDone: boolean;
  loadChatError: null | string;
  isOnline: boolean;
  chatRoomDetail: IChatRoom;
  onlineList: emailList[];
}

export interface IChatMessage {
  message_id?: number;
  room_id?: number;
  sender_email: string | null;
  name: string | null;
  generation?: string | number;
  message: string;
  sentAt: string;
}

export interface IChatInput {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClick: () => void;
  handleEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export interface IChatRoom {
  room_id: number;
  email: string;
  name: string;
  generation: string;
  message: string;
  sentAt: string;
  chatList: IChatMessage[] | null;
}

export interface emailList {
  member_email: string;
}
