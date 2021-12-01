import {
  ChatMessage,
  UsernameOnMessage
} from './styled';
import { useChats } from '../../contexts/Chat';
import { useAuthentication } from '../../contexts/Authentication';

export default function RoomChat() {
  const { roomMessages } = useChats();
  const { currentUser } = useAuthentication();
  return (
    <>
      {
        roomMessages?.map((roomMessage, key) =>
          roomMessage.user.id == currentUser?.id ? (
              <ChatMessage key={key} className='me'>
                <span>{ roomMessage.message }</span>
              </ChatMessage>
            )
            : (
              <ChatMessage key={key}>
                <UsernameOnMessage>{ roomMessage.user.username }:</UsernameOnMessage>
                <span> { roomMessage.message }</span>
              </ChatMessage>
            )
        )
      }
    </>
  )
}
