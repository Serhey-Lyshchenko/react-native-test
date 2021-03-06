import * as React from 'react';
import {View, StyleSheet, Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {TabView, SceneMap} from 'react-native-tab-view';
import Circles from '../components/Circles';
import Video from 'react-native-video';
import firebase from 'react-native-firebase';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';

const initialRoutes = [
  { key: '0', title: 'First' },
  { key: '1', title: 'Second' },
  { key: '2', title: 'Third' },
];

class Tab extends React.Component {
  render() {
    const {text} = this.props;

    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const initialLayout = {width: Dimensions.get('window').width};

@inject('analyticsService')
@observer
export default class SplashScreen extends React.Component {
  @observable index = 0;
  @observable fetched = false;
  routes = initialRoutes;

  render() {
    const renderScene = SceneMap(
      this.props.analyticsService.phrases.map(text =>
        (props) =>
          <Tab text={text} />
      )
    );

    this.props.analyticsService.startTracking(this.index);

    return (
      <View style={styles.root}>
        <Video
          source={require("../assets/mantissa.xyz_loop_003_compressed.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
        <View style={styles.scene}>
          <View style={styles.topSide}>
            <Image
              style={styles.logo}
              source={require('../assets/big-logo.png')}
            />
          </View>
          <View style={styles.bottomSide}>
            <Circles routes={initialRoutes} active={this.index} />
            <Button
              title="get started"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={this.getStarted}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Already a member?</Text>
              <Button
                title="Log in"
                type="clear"
                titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold'}}
                buttonStyle={{height: 20, padding: 0, paddingLeft: 5, margin: 0}}
              />
            </View>
          </View>
        </View>
        <TabView
          renderTabBar={() => null}
          navigationState={{index: this.index, routes: this.routes}}
          renderScene={renderScene}
          onIndexChange={this.switchTab}
          initialLayout={initialLayout}
        />
      </View>
    );
  }

  getStarted = () => {
    this.props.analyticsService.stopTracking(this.index);
    this.props.analyticsService.logSplashEvent();
    this.props.navigation.navigate('Register');
  };

  switchTab = (i) => {
    this.props.analyticsService.stopTracking(this.index);
    this.index = i;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#00003f',
  },
  scene: {
    zIndex:1000,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    paddingTop: 1
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  brand: {
    textTransform: 'uppercase',
    fontSize: 36,
    color: 'white',
    letterSpacing: 4,
  },
  topSide: {
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  bottomSide: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 136,
    height: 108,
    marginBottom: 24,
  },
  buttonTitle: {
    textTransform: 'uppercase',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
  }
});
