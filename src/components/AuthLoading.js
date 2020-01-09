import React from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {inject, observer} from 'mobx-react';

@inject('authService', 'authStore', 'analyticsService')
@observer
export default class AuthLoading extends React.Component {
  componentDidMount(): void {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    await this.props.analyticsService.loadTests();
    if (await this.props.authService.loginUser(accessToken)) {
      this.props.navigation.navigate('Authorized');
    } else {
      this.props.navigation.navigate('Splash');
    }
  };

  render() {
    return (
      <View style={styles.scene}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
