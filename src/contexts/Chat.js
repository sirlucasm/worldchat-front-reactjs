import { createContext, useContext, useState } from 'react';

const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [friendships, setFriendships] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState();

  return (
    <ChatsContext.Provider value={{
      chats,
      setChats,
      friendships,
      setFriendships,
      roomUsers,
      setRoomUsers,
      selectedChat,
      setSelectedChat
    }}>
      {children}
    </ChatsContext.Provider>
  );
}

export function useChats() {
  const {
    chats,
    setChats,
    friendships,
    setFriendships,
    roomUsers,
    setRoomUsers,
    selectedChat,
    setSelectedChat
  } = useContext(ChatsContext);
  return {
    chats,
    setChats,
    friendships,
    setFriendships,
    roomUsers,
    setRoomUsers,
    selectedChat,
    setSelectedChat
  };
}
