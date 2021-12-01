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
            <div>
              <div className="border-input px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                  <span className="absolute inset-y-0 flex items-center">
                      <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                          </svg>
                      </button>
                  </span>
                  <input name="newMessage" required type="text" placeholder="Escreva uma mensagem" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 rounded-full py-3" />
                  <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                      <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                          </svg>
                      </button>
                      <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                      </button>
                      <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                      </button>
                      <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                          </svg>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </ChatContainer>
          :
          <ChatVerification
            error={error}
          />
      }
    </>
  )
}
