import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {observe, reaction} from 'mobx';

@inject('authService', 'authStore')
@observer
class Screen extends React.Component {
  render() {
    return (
      <View style={styles.scene}>
        <Button title="logout" onPress={this.logout} />
        <Text style={{color: 'white'}}>
          {JSON.stringify(this.props.authStore.user)}
        </Text>
      </View>
    );
  }

  logout = async () => {
    await this.props.authService.logout();
    this.props.navigation.navigate('AuthLoading');
  };
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Screen;
