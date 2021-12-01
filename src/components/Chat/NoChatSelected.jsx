import {
  EmptyChat,
  EmptyChatTextArea
} from './styled';

export default function NoChatSelected() {
  return (
    <EmptyChat>
      <EmptyChatTextArea>
        <h3>Clique em algum chat para iniciar uma conversa.</h3>
      </EmptyChatTextArea>
    </EmptyChat>
  )
}
