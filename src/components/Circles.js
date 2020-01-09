import * as React from 'react';
import {View, StyleSheet} from 'react-native';

const Circles = ({routes, active}) => (
  <View style={styles.circles}>
    {routes.map(({key}) => (
      <View
        key={key}
        style={active === key ? [styles.circle, styles.active] : styles.circle}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  circles: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.3,
  },
  active: {
    opacity: 0.7,
  },
});

export default  Circles;
