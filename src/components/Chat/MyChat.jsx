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
import ChatMessageService from '../../services/ChatMessageService';
import ChatVerification from "./ChatVerification";

export default function MyChat() {
  const [error, setError] = useState();
  const { setIsLoading, currentUser } = useAuthentication();
  const { selectedChat, setChats, setChatMessages, chatMessages, closeChat } = useChats();

  useEffect(() => {
    const user = Cookies.get('user');

    const fetchChats = (stored) => {
      setIsLoading(true);
      if (selectedChat.type === 'friendship') {
        ChatService.myChats(stored, { toUserId: selectedChat.chat.toUser.id })
          .then(_chats => {
            setChats(_chats)
            if (_chats) fetchChatMessages(_chats);
          })
          .catch(error => setError(error.response.data.message))
          .finally(() => setIsLoading(false));
      }
    }

    const fetchChatMessages = (chat) => {
      setIsLoading(true);
      ChatMessageService.messages({ chatId: chat[0].id })
        .then(_messages => setChatMessages(_messages))
        .finally(() => setIsLoading(false));
    }

    fetchChats(user);
  }, []);

  return (
    <>
      {
        !error ?
          <ChatContainer>
            <ChatHeader>
              <button onClick={closeChat} type="button" title="Fechar conversa" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
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
            <ChatContent className="scroll-design">
              {
                chatMessages?.map((chatMessage, key) => (
                  <ChatMessage key={key} className={chatMessage.user.id == currentUser.id ? 'me' : ''}>
                    <span>{ chatMessage.message }</span>
                  </ChatMessage>
                ))
              }
            </ChatContent>
          </ChatContainer>
          :
          <ChatVerification
            error={error}
          />
      }
    </>
  )
}
