import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { useAuth } from '../hooks/index.jsx';
import ChannelsContainer from './ChannelsContainer.jsx';
import ChatContainer from './ChatContainer.jsx';
import Modal from './Modal.jsx';

const ChatPage = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        dispatch(channelsActions.setInitialСhannels(data));
        dispatch(messagesActions.setInitialMessages(data));
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <ChatContainer />
        <Modal />
      </div>
    </div>
  );
};

export default ChatPage;
