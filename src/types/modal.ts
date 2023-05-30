export interface ModalState {
  isConfirmModalOpen: boolean;
  isFullModalOpen: boolean;
  isChatModalOpen: boolean;
  isMyRevervationModalOpen: boolean;
}

/**
 * @props modalMessage 모달에 들어갈 메세지
 * @props modalController 추후 확인 버튼을 통해 api 연동할 때 넘겨줄 함수
 */
export interface ModalProps {
  modalMessage: string;
  modalController?: () => void;
}

export interface FullModalProps {
  title: string;
  children: React.ReactNode;
  modalHandler: () => void;
}
