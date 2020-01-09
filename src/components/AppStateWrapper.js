import React from 'react';
import {inject, observer} from 'mobx-react';
import {AppState, AsyncStorage} from 'react-native';
import {observable} from 'mobx';

@inject('analyticsService')
@observer
class AppStateWrapper extends React.Component {
  @observable appState = AppState.currentState;

  componentDidMount(): void {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  render() {
    return null;
  }

  handleAppStateChange = async (nextAppState) => {
    // if app went to background or was closed
    if (this.appState === 'active' && nextAppState.match(/inactive|background/)) {
      // if user not registered
      if (!await AsyncStorage.getItem('accessToken')) {
        this.props.analyticsService.logUnregisteredEvent();
      }
    }
    this.appState = nextAppState;
  }
}

export default AppStateWrapper;