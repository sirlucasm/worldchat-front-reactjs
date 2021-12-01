import { createContext, useContext, useState } from 'react';

const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
  const [chats, setChats] = useState();

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
}

export function useChats() {
  const { chats, setChats } = useContext(ChatsContext);
  return { chats, setChats };
}
