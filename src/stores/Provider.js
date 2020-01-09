import * as React from 'react';
import {Provider} from 'mobx-react';
import authStore from './AuthStore';
import authService from '../services/AuthService';
import analyticsService from '../services/AnalyticsService';

class StoreProvider extends React.Component {
  render() {
    return (
      <Provider
        authStore={authStore}
        authService={authService}
        analyticsService={analyticsService}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default StoreProvider;
