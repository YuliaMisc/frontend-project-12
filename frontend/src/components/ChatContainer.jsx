import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import { useApi, useAuth } from '../hooks/index.jsx';

const Messages = ({ author, text }) => {
  filter.add(filter.getDictionary('ru'));
  const message = filter.clean(text);
  return (
    <div className="text-break mb-2">
      <b>{author}</b>
      {`: ${message}`}
    </div>
  );
};

const ChatContainer = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const { addMessage } = useApi();
  const { getUserName } = useAuth();
  const currentUser = getUserName();
  filter.add(filter.getDictionary('ru'));

  const { messages } = useSelector((store) => store.messagesReducer);
  const { currentChannelId, channels } = useSelector((state) => state.channelsReducer);
  const currentChanel = channels.find(({ id }) => currentChannelId === id);
  const filretMaeesnge = messages.filter(({ channelId }) => channelId === currentChannelId);
  const nameChannel = currentChanel ? `# ${filter.clean(currentChanel.name)}` : '# general';

  const input = useRef(null);
  useEffect(() => input.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(value, currentUser, currentChannelId);
    setValue('');
    setLoadingStatus(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setLoadingStatus(false);
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{nameChannel}</b>
          </p>
          <span className="text-muted">{`${filretMaeesnge.length} ${t('chat.messageCount', { count: filretMaeesnge.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" />
        {filretMaeesnge.map(({
          text, username, channelId, id,
        }) => (
          <Messages
            key={id}
            text={text}
            author={username}
            channelId={channelId}
          />
        ))}
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label={t('channel.newMessage')}
                placeholder={t('chat.enterMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={value}
                onChange={handleChange}
                ref={input}
              />
              <button type="submit" disabled={loadingStatus} className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">{t('channel.send')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
