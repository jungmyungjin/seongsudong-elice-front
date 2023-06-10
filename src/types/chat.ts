export interface IChat {
  loadChatLoading: boolean;
  loadChatDone: boolean;
  loadChatError: null | string;
  isOnline: boolean;
  chatRoomList: IChatRoom[];
  chatRoomDetail: IChatRoom;
}

export interface IChatMessage {
  sender_email: string | null;
  name: string;
  generation?: string;
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
  chatList: IChatMessage[];
}
