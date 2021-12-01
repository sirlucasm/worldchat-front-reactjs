import API from '../settings/axios';

class RoomMessageService {
  constructor () {
    this.API = API;
  }

  async messagesByRoom (params) {
    return (await this.API.get('room-messages/messages/' + params.roomId)).data;
  }

  async sendMessage (params) {
    return (await this.API.post('room-messages', params)).data;
  }

  async deleteMessage (params) {
    return (await this.API.delete('room-messages' + params.id)).data;
  }
}

export default new RoomMessageService();
