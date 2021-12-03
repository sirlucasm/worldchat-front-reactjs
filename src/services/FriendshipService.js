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

  async findFriendshipByUserId (params) {
    return (await this.API.get('friendships/friend/' + params.id, { params: { currentUser: params.currentUser }})).data;
  }

  async findFriendRequests (currentUser) {
    var stored = JSON.parse(currentUser);
    return (await this.API.get('friendships/friend-requests', { params: { currentUser: stored.id }})).data;
  }

  async myFriends (currentUser) {
    var stored = JSON.parse(currentUser);
    return (await this.API.post('friendships/friends', { id: stored.id })).data;
  }

  async acceptFriendRequest (params, friendRequestId) {
    return (await this.API.patch('friendships/' + friendRequestId, params)).data;
  }

  async deleteFriendship (params) {
    return (await this.API.delete('friendships/' + params.id)).data;
  }
}

export default new FriendshipService();
