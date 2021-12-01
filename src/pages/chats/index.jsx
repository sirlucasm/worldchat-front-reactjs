import { useEffect } from "react";
import AuthenticationProvider from '../../contexts/Authentication';
import ChatsProvider from '../../contexts/Chat';
import Chats from './chats';

export default function ChatsIndex() {

  return (
    <AuthenticationProvider>
      <ChatsProvider>
        <Chats />
      </ChatsProvider>
    </AuthenticationProvider>
  );
}
