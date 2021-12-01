import router from 'next/router';
import { useAuthentication } from '../../../contexts/Authentication';
import { useChats } from '../../../contexts/Chat';
import ChatService from '../../../services/ChatService';
import {
  ChatError,
  ChatQuestion
} from './styled';

export default function ChatVerification({ error }) {
  const { currentUser, setIsLoading } = useAuthentication();
  const { selectedChat, setSelectedChat } = useChats();

  const startChat = () => {
    setIsLoading(true);
    const params = {
      toUser: { id: selectedChat.chat.toUser.id },
      startedBy: { id: currentUser.id }
    }
    ChatService.startChatting(params)
      .then(() => { router.reload(); })
      .finally(() => setIsLoading(false));
  }

  const cancelChat = () => {
    setSelectedChat(undefined);
  }

  return (
    <ChatError>
      <h3>{error}</h3>
      <ChatQuestion>
        <span>Deseja iniciar uma conversa com <strong>{ selectedChat.chat.toUser.username }</strong> agora?</span>
      </ChatQuestion>
      <div className="btn-area">
        <button onClick={startChat} className="rounded text-base mr-1 bg-blue-400 h-8 w-16 text-white hover:bg-blue-500 hover:text-white focus:outline-none" type="button">
          Sim
        </button>
        <button onClick={cancelChat} className="rounded text-base ml-1 bg-red-400 h-8 w-20 text-white hover:bg-red-500 hover:text-white focus:outline-none" type="button">
          Cancelar
        </button>
      </div>
    </ChatError>
  )
}
