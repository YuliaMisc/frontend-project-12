import React from 'react';
import { useAuth } from '../hooks/index.jsx';

const ChatPage = () => {
  const auth = useAuth();

  const handleClose = () => auth.logOut();

  return (
    <div>
      <p>Chat</p>
      <button type="button" onClick={handleClose}>Exit</button>
    </div>
  );
};

export default ChatPage;
