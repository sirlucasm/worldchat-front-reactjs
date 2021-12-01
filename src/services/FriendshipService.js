import API from '../settings/axios';

class FriendshipService {
  constructor () {
    this.API = API;
  }

  async createFriendship (params) {
    return (await this.API.post('friendships', params)).data;
  }

  async all () {
    return (await this.API.get('friendships')).data;
  }

  async find (params) {
    return (await this.API.get('friendships/' + params.id)).data;
  }

  async myFriends (currentUser) {
    var stored = JSON.parse(currentUser);
    return (await this.API.post('friendships/friends', { id: stored.id })).data;
  }

  async update (params) {
    return (await this.API.put('friendships', params)).data;
  }

  async deleteFriendship (params) {
    return (await this.API.delete('friendships/' + params.id)).data;
  }
}

export default new FriendshipService();
