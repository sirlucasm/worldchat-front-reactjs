import { useState } from 'react';
import FriendshipService from '../../services/FriendshipService';
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
import Toast from "../Toast";
import Modal from 'react-modal';
import { useAuthentication } from '../../contexts/Authentication';
import { useChats } from '../../contexts/Chat';
import router from 'next/router';

export default function FriendRequestsModal({ isOpen, closeModal, }) {
  const { currentUser } = useAuthentication();
  const { friendRequests } = useChats();
  const [toastMessage, setToastMessage] = useState();
  const [toastError, setToastError] = useState();

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

  const showFriendshipInfo = (friendship, key) => {
    if (friendship?.toUser.id != currentUser?.id) {
      return friendship.toUser[key];
    } else {
      return friendship.sendedBy[key];
    }
  }

  const denyFriendRequest = (friendRequest) => {
    FriendshipService.deleteFriendship({ id: friendRequest.id })
      .then(() => {
        setToastMessage(`A solicitação foi recusada.`);
        setTimeout(() => {
          closeModal();
          router.reload();
        }, 5000);
      })
      .catch(error => setToastError(error.response.data.message));
  }

  const acceptFriend = (friendRequest) => {
    FriendshipService.acceptFriendRequest({ accepted: true }, friendRequest.id)
      .then(() => {
        setToastMessage(`Solicitação aceita.`);
        setTimeout(() => {
          closeModal();
          router.reload();
        }, 5000);
      })
      .catch(error => setToastError(error.response.data.message));
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
            <h1>Solicitações de amizade</h1>
          </div>
          <button onClick={closeModal} type="button" title="Fechar modal" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <i className="fas fa-times"></i>
          </button>
        </ModalHeader>

        <ModalContent className="scroll-design">
          {
            friendRequests.length > 0 ?
              friendRequests.map((request, key) => (
                <ModalItems key={key} className="shadow">
                  <div>
                    {
                      showFriendshipInfo(request, 'profile_pic')?
                        <ProfileName src={showFriendshipInfo(request, 'profile_pic')} alt="profile pic"/>
                        :
                        <IconProfilePic>
                          <i aria-hidden className="fas fa-user"></i>
                        </IconProfilePic>
                    }
                    <Username>
                      {showFriendshipInfo(request, 'username')}
                    </Username>
                  </div>
                  <div>
                    <button onClick={() => acceptFriend(request)} type="button" title="Fechar conversa" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-green-700 hover:bg-green-400 focus:outline-none">
                      <i className="fas fa-check"></i>
                    </button>
                    <button onClick={() => denyFriendRequest(request)} type="button" title="Fechar conversa" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-red-700 hover:bg-red-400 focus:outline-none">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
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
        error={toastError}
      />
    </div>
  )
}
