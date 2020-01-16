import {action, observable} from 'mobx';
import firebase from "react-native-firebase";

const initialScreen = {
  totalTime: 0,
  isActive: false,
};

class AnalyticsService {
  @observable.deep screens = [
    initialScreen,
    initialScreen,
    initialScreen,
  ];
  @observable.deep phrases = ['','',''];
  @observable startTime;
  @observable currentTracking;
  @observable loadingABTests;
  @observable swipesCounter = 0;
  @observable failureRegisterCount = 0;

  constructor() {
    firebase.config().enableDeveloperMode();
  }

  @action startTracking(screen) {
    if (this.screens[screen].isActive) {
      return;
    }

    this.swipesCounter++;
    this.startTime = Date.now();
    this.screens[screen].isActive = true;
    this.currentTracking = this.screens[screen];
  }

  @action stopTracking(screen) {
    if (!this.screens[screen].isActive) {
      return;
    }

    const difference = Date.now() - this.startTime;
    this.screens[screen].totalTime += difference;
    this.screens[screen].isActive = false;
    this.currentTracking = null;
  }

  @action async loadTests() {
    this.loadingABTests = true;

    await firebase.config().fetch();
    await firebase.config().activateFetched();

    this.phrases = Object.values(await firebase.config().getValues([
      'first_screen',
      'second_screen',
      'third_screen',
    ])).map(test => test.val());

    this.loadingABTests = false;
  }

  logSplashEvent() {
    firebase.analytics().setAnalyticsCollectionEnabled(true);

    this.screens.forEach((screen, index) => {
      const screenNumber =
        index === 1
        ? 'second'
        : index === 2
        ? 'third'
        : 'first';

      firebase.analytics().logEvent(`splash_${screenNumber}_view`, {eventValue: screen.totalTime});
    });
    
    firebase.analytics().logEvent(`splash_swipes_count`, {eventValue: this.swipesCounter});
  }

  logUnregisteredEvent() {
    firebase.analytics().logEvent(`how_many_times_register_is_failed`, {eventValue: this.failureRegisterCount});
  }

  @action incrementFailure() {
    this.failureRegisterCount++;
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;
