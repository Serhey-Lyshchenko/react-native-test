import {Image, StyleSheet} from 'react-native';
import * as React from 'react';

const Eye = ({cross}) => {
  const source = cross
    ? require('../../assets/eye-cross.png')
    : require('../../assets/eye.png');

  return <Image style={styles.icon} source={source} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Eye;
