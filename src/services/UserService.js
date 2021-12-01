import API from '../settings/axios';
import Cookie from 'js-cookie';

const current_user_stored = Cookie.get('user');

class UserService {
  constructor () {
    this.API = API;
    this.stored = current_user_stored && JSON.parse(current_user_stored);
  }

  async createAccount (params) {
    const user = (await this.API.post('users', params)).data;
    Cookie.set('user', JSON.stringify(user));
    return user;
  }

  async currentUser (params) {
    var stored = JSON.parse(params);
    return (await this.API.get('users/' + stored.id)).data;
  }

  async all () {
    return (await this.API.get('users')).data;
  }

  async login (params) {
    const user = (await this.API.post('users/login', params)).data;
    Cookie.set('user', JSON.stringify(user));
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
