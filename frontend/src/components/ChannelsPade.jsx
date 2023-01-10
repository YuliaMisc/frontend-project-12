import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useApi, useAuth } from '../hooks/index.jsx';

const Messages = ({ author, text }) => (
  <div className="text-break mb-2">
    <b>{author}</b>
    :
    {text}
  </div>
);

const Channels = ({
  value, id, isCurrent,
}) => {
  const classButtons = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', { 'btn-secondary': isCurrent });
  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button type="button" className={classButtons} id={id}>
          <span className="me-1">#</span>
          {value}
        </button>
      </div>
    </li>
  );
};

const ChannelsPade = () => {
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  const { addMessage } = useApi();
  const { getUserName } = useAuth();
  const currentUser = getUserName();

  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);
  const { messages } = useSelector((store) => store.messagesReducer);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({ text: value, username: currentUser, channelId: currentChannelId });
    setValue('');
  };

  return (
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>{t('channel.channels')}</span>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          {channels.map(({ name, id }) => (
            <Channels
              key={id}
              value={name}
              id={id}
              isCurrent={(currentChannelId === id)}
            />
          ))}
        </ul>
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># general</b>
            </p>
            <span className="text-muted">0 сообщений</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 " />
          {messages.map(({
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
                  aria-label="Новое сообщение"
                  placeholder="Введите сообщение..."
                  className="border-0 p-0 ps-2 form-control"
                  value={value}
                  onChange={handleChange}
                />
                <button type="submit" disabled="" className="btn btn-group-vertical">
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
    </div>
  );
};

export default ChannelsPade;
