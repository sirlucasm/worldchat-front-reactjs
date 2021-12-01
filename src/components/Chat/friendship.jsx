import {
  ChatMessage,
} from './styled';
import { useChats } from '../../contexts/Chat';
import { useAuthentication } from '../../contexts/Authentication';

export default function FriendshipChat() {
  const { chatMessages } = useChats();
  const { currentUser } = useAuthentication();
  return (
    <>
      {
        chatMessages?.map((chatMessage, key) => (
          <ChatMessage key={key} className={chatMessage.user.id == currentUser.id ? 'me' : ''}>
            <span>{ chatMessage.message }</span>
          </ChatMessage>
        ))
      }
    </>
  )
}
