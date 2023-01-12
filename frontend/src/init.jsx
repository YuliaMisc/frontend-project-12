import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App';
import resources from './locales/index.js';
import store from './slices/store.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import ApiContext from './hooks/ApiContextProvider.jsx';

const init = async () => {
  const socket = io();

  const emittingEvents = (evens, arg) => new Promise((resolve, reject) => {
    socket.emit(evens, arg, (response) => (response.status === 'ok' ? resolve(response.data) : reject()));
  });

  const addMessage = async (text, username, channelId) => {
    const response = await emittingEvents('newMessage', { text, username, channelId });
    return response;
  };
  const addCannel = async (name) => {
    const response = await emittingEvents('newChannel', { name });
    return response;
  };
  const removeChannel = async (id) => {
    await emittingEvents('removeChannel', { id });
  };
  const renameChannel = async (name, id) => {
    await emittingEvents('renameChannel', { name, id });
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const api = {
    addMessage,
    addCannel,
    removeChannel,
    renameChannel,
  };

  return (
    <Provider store={store}>
      <ApiContext.Provider value={api}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </ApiContext.Provider>
    </Provider>
  );
};

export default init;
