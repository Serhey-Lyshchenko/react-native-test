import {Image, StyleSheet} from 'react-native';
import * as React from 'react';

const LinkedIn = () => {
  const source = require('../../assets/linkedin.png');
  return <Image style={styles.icon} source={source} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default LinkedIn;
