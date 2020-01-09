import {Image, StyleSheet} from 'react-native';
import * as React from 'react';

const Google = () => {
  const source = require('../../assets/google.png');
  return <Image style={styles.icon} source={source} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default Google;
