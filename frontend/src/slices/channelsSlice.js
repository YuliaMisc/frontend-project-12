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
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
