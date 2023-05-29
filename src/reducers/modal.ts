import { createSlice } from '@reduxjs/toolkit';
import { ModalState } from '../types/modal';

export const initialState: ModalState = {
  isConfirmModalOpen: false,
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
  },
});

export const { openConfirmModal, closeConfirmModal } = modalSlice.actions;
export default modalSlice;
