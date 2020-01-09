import {observable, action} from 'mobx';

class AuthStore {
  @observable.deep user = {};

  @action setUser(userInfo) {
    this.user = userInfo;
  }

  @action clearUser() {
    this.user = {};
  }
}

const authStore = new AuthStore();
export default authStore;
