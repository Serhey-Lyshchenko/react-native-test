import Auth0 from 'react-native-auth0';
import {AsyncStorage} from 'react-native';
import authStore from '../stores/AuthStore';
import analyticsService from './AnalyticsService';

class AuthService {
  auth0 = new Auth0({
    domain: 'evolveapp.eu.auth0.com',
    clientId: 't1qdbRfwIe0d7OFedwMkHBLRah3jNfzK',
  });
  dbConnection = 'Username-Password-Authentication';

  constructor() {
    AsyncStorage.getItem('accessToken').then(async accessToken => {
      if (!accessToken) {
        return;
      }

      await this.loginUser(accessToken);
    });
  }

  async register(userData) {
    try {
      await this.auth0.auth.createUser({
        ...userData,
        connection: this.dbConnection,
      });
    } catch {
      analyticsService.incrementFailure();
      return undefined;
    }

    return await this.login({
      username: userData.email,
      password: userData.password
    });
  }

  async login(credentials) {
    const result = await this.auth0.auth.passwordRealm({
      ...credentials,
      realm: this.dbConnection,
    });

    await AsyncStorage.setItem('accessToken', result.accessToken);

    return await this.loginUser(result.accessToken);
  }

  async loginUser(accessToken) {
    if (!accessToken) {
      return null;
    }

    const userInfo = await this.auth0.auth.userInfo({token: accessToken});
    authStore.setUser(userInfo);
    return userInfo;
  }

  async loginWithGoogle() {
    const result = await this.auth0.webAuth.authorize({
      connection: 'google-oauth2',
    });

    await AsyncStorage.setItem('accessToken', result.accessToken);

    return await this.loginUser(result.accessToken);
  }

  async loginWithLinkedIn() {
    const result = await this.auth0.webAuth.authorize({
      connection: 'linkedin',
    });

    await AsyncStorage.setItem('accessToken', result.accessToken);

    return await this.loginUser(result.accessToken);
  }

  async logout() {
    await AsyncStorage.removeItem('accessToken');
    authStore.clearUser();
    return await this.auth0.webAuth.clearSession();
  }
}

const authService = new AuthService();
export default authService;
