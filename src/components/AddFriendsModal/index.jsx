import router from 'next/router';
import { useRef, useState } from 'react';
import Toast from "../Toast";
import Modal from 'react-modal';
import FriendshipService from '../../services/FriendshipService';
import UserService from '../../services/UserService';
import {
  ModalHeader,
  ModalSearchArea,
  ModalContent,
  InputSearchArea,
  ModalItems,
  NoContent,
  ProfileName,
  Username,
  IconProfilePic
} from './styled';
import { useAuthentication } from '../../contexts/Authentication';

export default function AddFriendsModal({ isOpen, closeModal,  }) {
  const usernameSearchRef = useRef();
  const { currentUser } = useAuthentication();
  const [searchQuery, setSearchQuery] = useState();
  const [users, setUsers] = useState([]);
  const [toastMessage, setToastMessage] = useState();

  const content = {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '60vh',
  }

  const searchUsers = (username) => {
    setSearchQuery(username);
    UserService.searchUsers({ username })
      .then(_users => setUsers(_users));
  }

  const addFriend = (user) => {
    FriendshipService.createFriendship({
      sendedBy: { id: currentUser.id, },
      toUser: { id: user.id }
    })
      .then(() => {
        setToastMessage(`Solicitação enviada para ${user.username}`);
        usernameSearchRef.current.value = '';
        setSearchQuery();
      })
      .catch(console.error)
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{ content }}
      >
        <ModalHeader>
          <div></div>
          <div>
            <h1>Adicionar amigos</h1>
          </div>
          <button onClick={closeModal} type="button" title="Fechar modal" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <i className="fas fa-times"></i>
          </button>
        </ModalHeader>
        <ModalSearchArea>
          <InputSearchArea>
            <input
              onChange={(e) => searchUsers(e.target.value)}
              ref={usernameSearchRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Buscar usuário"
              required
            />
          </InputSearchArea>
        </ModalSearchArea>
        <ModalContent className="scroll-design">
          {
            searchQuery ?
              users.map((user, key) => (
                <ModalItems key={key} className="shadow">
                  <div>
                    {
                      user.profile_pic?
                        <ProfileName src={user.profile_pic} alt="profile pic"/>
                        :
                        <IconProfilePic>
                          <i aria-hidden className="fas fa-user"></i>
                        </IconProfilePic>
                    }
                    <Username>
                      {user.username}
                    </Username>
                  </div>
                  <button onClick={() => addFriend(user)} type="button" title="Fechar conversa" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-green-700 hover:bg-green-400 focus:outline-none">
                    <i className="fas fa-plus"></i>
                  </button>
                </ModalItems>
              ))
              :
              <NoContent>
                <span>Nada a exibir...</span>
              </NoContent>
          }
        </ModalContent>
      </Modal>
      <Toast
        message={toastMessage}
      />
    </div>
  )
}
