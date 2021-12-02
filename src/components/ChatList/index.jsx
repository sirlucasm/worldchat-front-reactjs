import {
  MyChatList,
  ChatListContent,
  ContentTitle,
  InfoArea,
  Lists,
  PicArea,
  TitleArea,
} from './styled';

import { useAuthentication } from "../../contexts/Authentication";
import { useChats } from "../../contexts/Chat";

export default function ChatList() {
  const { currentUser } = useAuthentication();
  const { friendships, roomUsers, myRooms, setSelectedChat, selectedChat } = useChats();

  const showFriendshipInfo = (friendship, key) => {
    if (friendship?.toUser.id != currentUser?.id) {
      return friendship.toUser[key];
    } else {
      return friendship.sendedBy[key];
    }
  }

  return (
    <MyChatList>
      <TitleArea>
        <h2>Conversas</h2>
      </TitleArea>

      <div>
        <ChatListContent className="scroll-design">
          <ContentTitle>
            <h3>Amigos ({ friendships?.length })</h3>
          </ContentTitle>
          {
            friendships?.map((friendship, key) => (
              <Lists key={key} onClick={() => !selectedChat && setSelectedChat({ chat: friendship, type: 'friendship' })} className={selectedChat && "disabled"}>
                <PicArea src={friendship.toUser.profile_pic ? friendship.toUser.profile_pic : '/assets/icons/user.png'} alt="profile picture" />
                <InfoArea>
                  <h3>{ showFriendshipInfo(friendship, 'username') }</h3>
                  <span>{ showFriendshipInfo(friendship, 'email') }</span>
                </InfoArea>
              </Lists>
            ))
          }
        </ChatListContent>

        <ChatListContent className="scroll-design">
          <ContentTitle>
            <h3>Salas ({ roomUsers?.length + myRooms.length })</h3>
          </ContentTitle>
          {
            roomUsers?.map((roomUser, key) => (
              <Lists key={key} onClick={() => !selectedChat && setSelectedChat({ chat: roomUser, type: 'room' })} className={selectedChat && "disabled"}>
                <PicArea src={ roomUser.room.roomPic ? roomUser.room.roomPic : 'assets/icons/user.png' } alt="profile picture" />
                <InfoArea>
                  <h3>{ roomUser.room.name }</h3>
                </InfoArea>
              </Lists>
            ))
          }
          {
            myRooms?.map((myRoom, key) => (
              <Lists key={key} onClick={() => !selectedChat && setSelectedChat({ chat: myRoom, type: 'room' })} className={selectedChat && "disabled"}>
                <PicArea src={ myRoom.room.roomPic ? myRoom.room.roomPic : 'assets/icons/user.png' } alt="profile picture" />
                <InfoArea>
                  <h3>{ myRoom.room.name }</h3>
                </InfoArea>
              </Lists>
            ))
          }
        </ChatListContent>
      </div>
    </MyChatList>
  );
}
