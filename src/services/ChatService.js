import API from '../settings/axios';

class ChatService {
  constructor () {
    this.API = API;
  }

  async startChatting (params) {
    return (await this.API.post('chats', params)).data;
  }

  async all () {
    return (await this.API.get('chats')).data;
  }

  async myChats (currentUser, params) {
    var stored = JSON.parse(currentUser);
    return (await this.API.get('chats/my/' + stored.id + '/' + params.toUserId)).data;
  }

  async deleteChat (params) {
    return (await this.API.delete('chats/' + params.id)).data;
  }
}

export default new ChatService();
