import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAuthentication } from "../../contexts/Authentication";
import { useChats } from "../../contexts/Chat";
import {
  ChatGrid
} from '../../components/Chats';

import UserService from "../../services/UserService";
import Menu from "../../components/Menu";
import ChatList from "../../components/ChatList";
import ChatService from "../../services/ChatService";
import FriendshipService from "../../services/FriendshipService";
import RoomUserService from "../../services/RoomUserService";


export default function Chats() {
  const { setCurrentUser, setIsLoading } = useAuthentication();
  const { setChats, setFriendships, setRoomUsers } = useChats();

  useEffect(() => {
    const user = Cookies.get('user');

    const fetchCurrentUser = (stored) => {
      setIsLoading(true);
      UserService.currentUser(stored)
        .then(_currentUser => setCurrentUser(_currentUser))
        .finally(() => setIsLoading(false));
    }

    const fetchChats = async () => {
      setIsLoading(true);
      ChatService.all()
        .then(_chats => setChats(_chats))
        .finally(() => setIsLoading(false));
    }

    const fetchFriendships = async (stored) => {
      setIsLoading(true);
      FriendshipService.myFriends(stored)
        .then(_friendships => setFriendships(_friendships))
        .finally(() => setIsLoading(false));
    }

    const fetchRoomUsers = (stored) => {
      setIsLoading(true);
      RoomUserService.roomsImIn(stored)
        .then(_roomUsers => setRoomUsers(_roomUsers))
        .finally(() => setIsLoading(false));
    }

    fetchCurrentUser(user);
    fetchChats();
    fetchFriendships(user);
    fetchRoomUsers(user);
  }, [setChats, setCurrentUser, setFriendships, setIsLoading, setRoomUsers]);

  return (
    <ChatGrid>
      <Menu />
      <ChatList />
    </ChatGrid>
  );
}
