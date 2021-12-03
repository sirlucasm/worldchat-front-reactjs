import API from '../settings/axios';
import Cookies from 'js-cookie';

class UserService {
  constructor () {
    this.API = API;
  }

  async createAccount (params) {
    const user = (await this.API.post('users', params)).data;
    Cookies.set('user', JSON.stringify(user));
    return user;
  }

  async currentUser (currentUser) {
    var stored = JSON.parse(currentUser);
    return (await this.API.get('users/' + stored.id)).data;
  }

  async all () {
    return (await this.API.get('users')).data;
  }

  async searchUsers (param) {
    return (await this.API.get('users/search', { params: { username: param.username }})).data;
  }

  async login (params) {
    const user = (await this.API.post('users/login', params)).data;
    Cookies.set('user', JSON.stringify(user));
    return user;
  }

  async update (params) {
    return (await this.API.put('users', params)).data;
  }

  async deleteAccount (params) {
    return (await this.API.delete('users', { body: params })).data;
  }
}

export default new UserService();
