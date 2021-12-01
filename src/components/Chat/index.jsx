import { useChats } from '../../contexts/Chat';
import MyChat from './MyChat';
import NoChatSelected from './NoChatSelected';

export default function Chat() {
  const { selectedChat } = useChats();
  return (
    <>
      {
        selectedChat ?
          <MyChat />
          :
          <NoChatSelected />
      }
    </>
  )
}
