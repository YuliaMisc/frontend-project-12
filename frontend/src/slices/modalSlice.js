/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null, channelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      const { modalType, channelId } = payload;
      state.modalType = modalType;
      state.channelId = channelId;
    },
    closeModal(state) {
      state.modalType = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
