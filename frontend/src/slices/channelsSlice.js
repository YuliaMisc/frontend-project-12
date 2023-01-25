/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialChannels(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    switchChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      const { id } = payload;
      state.channels.push(payload);
      state.currentChannelId = id;
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      const defaultChannelId = 1;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = defaultChannelId;
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
