import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

export const HeaderBackIcon = () => (
  <Icon
    name="angle-left"
    size={32}
    color="white"
    style={styles.backArrow}
  />
);

export const HeaderMiddleIcon = () => (
  <Image
    style={styles.logo}
    source={require('../assets/logo.png')}
  />
);

export const HeaderRightTitle = () => (
    <Button
      title="Log in"
      type="clear"
      titleStyle={styles.headerButtonTitle}
    />
);

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
  },
  headerButtonTitle: {
    fontSize: 14,
    color: 'white',
  },
  backArrow: {
    paddingLeft: Platform.OS === 'ios' ? 5 : 0
  }
});