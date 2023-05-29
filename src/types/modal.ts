export interface ModalState {
  isConfirmModalOpen: boolean;
  isChatModalOpen: boolean;
  isMyRevervationModalOpen: boolean;
}
export interface ModalProps {
  modalMessage: string;
  modalType: string;
}
