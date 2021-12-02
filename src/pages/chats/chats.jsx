import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../contexts/Authentication";
import { useChats } from "../../contexts/Chat";
import {
  ChatGrid
} from '../../components/Chats';

import UserService from "../../services/UserService";
import Menu from "../../components/Menu";
import ChatList from "../../components/ChatList";
import FriendshipService from "../../services/FriendshipService";
import RoomUserService from "../../services/RoomUserService";
import Chat from "../../components/Chat";
import Head from "next/head";
import AddFriendsModal from "../../components/AddFriendsModal";
import CreateRoomModal from "../../components/CreateRoomModal";
import RoomService from "../../services/RoomService";


export default function Chats() {
  const { setCurrentUser, setIsLoading } = useAuthentication();
  const { setFriendships, setRoomUsers, setMyRooms } = useChats();
  const [modalAddFriendsOpen, setModalAddFriendsOpen] = useState(false);
  const [modalCreateRoomOpen, setModalCreateRoomOpen] = useState(false);

  useEffect(() => {
    const user = Cookies.get('user');

    const fetchCurrentUser = (stored) => {
      setIsLoading(true);
      UserService.currentUser(stored)
        .then(_currentUser => setCurrentUser(_currentUser))
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

    const fetchMyRooms = (stored) => {
      setIsLoading(true);
      RoomService.myRooms(stored)
        .then(_myRooms => {
          const newRoomsList = [];
          var room = {};
          var user = {};
          _myRooms?.map((data) => {
            user = data.createdBy;
            delete data.createdBy;
            room = data;
            newRoomsList.push({ room, user });
          });
          setMyRooms(newRoomsList);
        })
        .finally(() => setIsLoading(false));
    }

    fetchCurrentUser(user);
    fetchFriendships(user);
    fetchRoomUsers(user);
    fetchMyRooms(user);
  }, [setCurrentUser, setFriendships, setIsLoading, setMyRooms, setRoomUsers]);

  return (
    <ChatGrid>
      <Head>
        <title>Chats</title>
      </Head>
      <Menu
        setModalAddFriendsOpen={setModalAddFriendsOpen}
        setModalCreateRoomOpen={setModalCreateRoomOpen}
      />
      <ChatList />
      <Chat />
      <AddFriendsModal
        isOpen={modalAddFriendsOpen}
        closeModal={() => setModalAddFriendsOpen(false)}
      />
      <CreateRoomModal
        isOpen={modalCreateRoomOpen}
        closeModal={() => setModalCreateRoomOpen(false)}
      />
    </ChatGrid>
  );
}
