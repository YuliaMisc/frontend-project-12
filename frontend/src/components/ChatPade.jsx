import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { useAuth } from '../hooks/index.jsx';
import ChannelsContainer from './ChannelsContainer.jsx';
import ChatContainer from './ChatContainer.jsx';
import ModalContainer from './Modal.jsx';
import routes from '../routes.js';

const ChatPage = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        dispatch(channelsActions.setInitialСhannels(data));
        dispatch(messagesActions.setInitialMessages(data));
      };
      getData();
    } catch (err) {
      if (err.isAxiosError) { // eslint-disable-line
        toast.error(t('errors.network'));
        throw err;
      } else {
        toast.error(t('erros.unknown'));
      }
    }
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <ChatContainer />
        <ModalContainer />
      </div>
    </div>
  );
};

export default ChatPage;
