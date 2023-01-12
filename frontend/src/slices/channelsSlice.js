/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialСhannels(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    switchChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
    renameChannel(state, { payload }) {
      const { name, id } = payload;
      const renameChannel = state.channels.find((channel) => channel.id === id);
      renameChannel.name = name;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
