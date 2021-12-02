import { useState } from 'react';
import {
  ModalHeader,
  ModalFormArea,
  InputArea,
  RoomPic
} from './styled';
import Toast from "../Toast";
import Modal from 'react-modal';
import { useAuthentication } from '../../contexts/Authentication';
import RoomService from '../../services/RoomService';
import router from 'next/router';

export default function CreateRoomModal({ isOpen, closeModal, }) {
  const { currentUser } = useAuthentication();
  const [toastMessage, setToastMessage] = useState();
  const [toastError, setToastError] = useState();
  const [name, setName] = useState();
  const [maxUsers, setMaxUsers] = useState();
  const [roomPic, setRoomPic] = useState();

  const maxUsersList = Array.from({length: 256}, (_, i) => i + 1);

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

  const createRoom = (e) => {
    e.preventDefault();
    const params = { name, maxUsers, roomPic };
    params.createdBy = { id: currentUser.id };

    RoomService.createRoom(params)
      .then(() => {
        setToastMessage('Sala criada com sucesso.');
        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch(() => setToastError('Não foi possível criar a sala. Revise os dados'));
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
            <h1>Criar uma sala</h1>
          </div>
          <button onClick={closeModal} type="button" title="Fechar modal" className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <i className="fas fa-times"></i>
          </button>
        </ModalHeader>
        <ModalFormArea onSubmit={createRoom}>
          <div className="flex flex-wrap justify-center">
            <RoomPic
              src={roomPic ? roomPic : '/assets/icons/user.png'}
              alt="..."
              style={!roomPic ? { height: 160, width: 160, background: '#efefef' } : {height: 160, width: 160}}
              className="rounded-full max-w-full h-auto align-middle border-none"
            />
          </div>
          <InputArea>
            <input
              onChange={(e) => setRoomPic(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Imagem"
              required
            />
          </InputArea>
          <InputArea>
            <input
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Nome"
              required
            />
          </InputArea>
          <InputArea>
            <select
              className="shadow appearance-none form-select border leading-tight py-2 px-3 focus:outline-none focus:shadow-outline text-gray-700 rounded w-full"
              onChange={(e) => setMaxUsers(e.target.value)}
              required
            >
              <option className="text-gray-600" value={0}>Número máx. de usuários</option>
              {
                maxUsersList.map((val, key) => (
                  <option className="text-gray-600" value={val} key={key}>{val}</option>
                ))
              }
            </select>
          </InputArea>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Criar sala
          </button>
        </ModalFormArea>
      </Modal>
      <Toast
        message={toastMessage}
        error={toastError}
      />
    </div>
  );
}
