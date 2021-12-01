import API from '../settings/axios';

class ChatMessageService {
  constructor () {
    this.API = API;
  }

  async sendMessage (params) {
    return (await this.API.post('chat-messages', params)).data;
  }

  async messages (params) {
    return (await this.API.get('chat-messages/messages/' + params.chatId)).data;
  }

  async deleteMessage (params) {
    return (await this.API.delete('chat-messages/' + params.id)).data;
  }
}

export default new ChatMessageService();
