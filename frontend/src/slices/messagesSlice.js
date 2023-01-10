/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setInitialMessages(state, { payload }) {
      const { messages } = payload;
      state.messages = messages;
    },
    addNewMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
