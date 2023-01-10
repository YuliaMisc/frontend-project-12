import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App';
import resources from './locales/index.js';
import store from './slices/store.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import ApiContext from './hooks/ApiContextProvider.jsx';

const init = async () => {
  const socket = io();

  const emittingEvents = (evens, arg) => {
    socket.emit(evens, arg);
  };

  const addMessage = (message) => {
    emittingEvents('newMessage', message);
  };

  socket.on('newMessage', (payload) => {
    console.log(store.dispatch);
    store.dispatch(messagesActions.addNewMessage(payload));
  });

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const api = { addMessage };

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
