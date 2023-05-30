import { createSlice } from '@reduxjs/toolkit';
import { ModalState } from 'types/modal';

export const initialState: ModalState = {
  isConfirmModalOpen: false,
  isFullModalOpen: false,
  isChatModalOpen: false,
  isMyRevervationModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openConfirmModal: state => {
      state.isConfirmModalOpen = true;
    },
    closeConfirmModal: state => {
      state.isConfirmModalOpen = false;
    },
    openFullModal: state => {
      state.isFullModalOpen = true;
    },
    closeFullModal: state => {
      state.isFullModalOpen = false;
    },
    openChatModal: state => {
      state.isChatModalOpen = true;
    },
    closeChatModal: state => {
      state.isChatModalOpen = false;
    },
  },
});

export const { openConfirmModal, closeConfirmModal } = modalSlice.actions;
export default modalSlice;
