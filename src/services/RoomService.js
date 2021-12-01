import API from '../settings/axios';

class RoomService {
  constructor () {
    this.API = API;
  }

  async createRoom (params) {
    return (await this.API.post('rooms', params)).data;
  }

  async all () {
    return (await this.API.get('rooms')).data;
  }

  async myRooms (currentUser) {
    var stored = JSON.parse(currentUser);
    return (await this.API.get('rooms/my-rooms/' + stored.id)).data;
  }

  async find (params) {
    return (await this.API.get('rooms/' + params.roomId)).data;
  }

  async changeRoomName (params, roomId) {
    return (await this.API.patch('rooms/' + roomId, { body: params })).data;
  }

  async deleteRoom (params, roomId) {
    return (await this.API.delete('rooms/' + roomId, { body: params })).data;
  }
}

export default new RoomService();
