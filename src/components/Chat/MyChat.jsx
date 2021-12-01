/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import {
  ChatContainer,
  BorderInput,
  ChatContent,
  ChatHeader,
  ChatMessage,
} from './styled';
import { useChats } from '../../contexts/Chat';
import { useAuthentication } from '../../contexts/Authentication';
import { useEffect, useState } from 'react';
import ChatService from '../../services/ChatService';
import ChatVerification from "./ChatVerification";

export default function MyChat() {
  const [error, setError] = useState();
  const { setIsLoading } = useAuthentication();
  const { selectedChat, setChats } = useChats();

  useEffect(() => {
    const user = Cookies.get('user');

    const fetchChats = (stored) => {
      setIsLoading(true);
      if (selectedChat.type === 'friendship') {
        ChatService.myChats(stored, { toUserId: selectedChat.chat.toUser.id })
          .then(_chats => setChats(_chats))
          .catch(error => setError(error.response.data.message))
          .finally(() => setIsLoading(false));
      }
    }

    fetchChats(user);
  }, []);

  return (
    <>
      {
        !error ?
          <ChatContainer>
            <ChatHeader>
              <button type="button" title="Fechar conversa" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <i className="fas fa-times"></i>
              </button>
              <div>
                <h2>{ selectedChat.type == 'friendship' ? selectedChat.chat.toUser.username : selectedChat?.chat.room.name }</h2>
              </div>
              <div>
                <button type="button" title="Opções" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </ChatHeader>
          </ChatContainer>
          :
          <ChatVerification
            error={error}
          />
      }
    </>
  )
}
