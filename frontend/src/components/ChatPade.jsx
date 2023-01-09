import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { useAuth } from '../hooks/index.jsx';
import ChannelsPade from './ChannelsPade.jsx';

const ChatPage = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        dispatch(channelsActions.setInitialСhannels(data));
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <ChannelsPade />
    </div>
  );
};

export default ChatPage;
