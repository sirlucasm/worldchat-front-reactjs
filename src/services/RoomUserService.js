import API from '../settings/axios';

class RoomUserService {
  constructor () {
    this.API = API;
  }

  async enterInRoom (params) {
    return (await this.API.post('room-users', params)).data;
  }

  async all () {
    return (await this.API.get('room-users')).data;
  }

  async roomsImIn (currentUser) {
    var stored = JSON.parse(currentUser);
    return (await this.API.get('room-users/rooms/' + stored.id)).data;
  }

  async exitRoom (params, roomId) {
    return (await this.API.delete('room-users/' + roomId, { body: params })).data;
  }
}

export default new RoomUserService();
