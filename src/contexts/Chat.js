import { createContext, useContext, useState } from 'react';

const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [friendships, setFriendships] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [chatMessages, setChatMessages] = useState();

  const closeChat = () => {
    setSelectedChat(undefined);
  }

  const props = {
    chats,
    setChats,
    friendships,
    setFriendships,
    roomUsers,
    setRoomUsers,
    selectedChat,
    setSelectedChat,
    chatMessages,
    setChatMessages,
    closeChat
  }

  return (
    <ChatsContext.Provider value={props}>
      {children}
    </ChatsContext.Provider>
  );
}

export function useChats() {
  return useContext(ChatsContext);
}
