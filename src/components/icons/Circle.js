import {Image, StyleSheet} from 'react-native';
import * as React from 'react';

const Circle = ({left, right, type}) => {
  const source =
    type === 'error'
      ? require('../../assets/checkbox-circle-error.png')
      : type === 'success'
      ? require('../../assets/checkbox-circle-success.png')
      : require('../../assets/checkbox-circle.png');

  return (
    <Image
      style={{
        ...styles.icon,
        marginLeft: left ? 0 : 8,
        marginRight: right ? 0 : 8,
      }}
      source={source}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Circle;
