import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions, Platform,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import * as validation from '../utils/validation';
import Eye from '../components/icons/Eye';
import Circle from '../components/icons/Circle';
import {Button} from 'react-native-elements';
import Google from '../components/icons/Google';

@inject('authStore')
@inject('authService')
@observer
class Screen extends React.Component {
  @observable agree = false;
  @observable allowToRegister = false;
  @observable showPassword = false;
  @observable.deep form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  @observable.deep validation = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  };

  render() {
    return (
      <View style={styles.scene}>
        <View style={styles.form}>
          <Text style={[styles.text, styles.textCenter, styles.header]}>
            Create free account {this.props.authStore.test}
          </Text>
          <View style={styles.formControl}>
            <Text style={styles.text}>first name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={this.form.firstName}
                onChangeText={text => this.handleChange('firstName', text)}
              />
              {this.validation.firstName && <Circle type="success" right />}
              {this.validation.firstName === false && (
                <Circle type="error" right />
              )}
            </View>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.text}>last name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={this.form.lastName}
                onChangeText={text => this.handleChange('lastName', text)}
              />
              {this.validation.lastName && <Circle type="success" right />}
              {this.validation.lastName === false && (
                <Circle type="error" right />
              )}
            </View>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.text}>email or phone number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={this.form.email}
                onChangeText={text => this.handleChange('email', text)}
              />
              {this.validation.email && (
                <Circle type="success" right />
              )}
              {this.validation.email === false && (
                <Circle type="error" right />
              )}
            </View>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.text}>password (min 8 characters)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={this.form.password}
                secureTextEntry={Platform.OS === 'android' || !this.showPassword}
                keyboardType={
                   Platform.OS === 'android' && this.showPassword? 'visible-password' : 'default'
                }
                onChangeText={text => this.handleChange('password', text)}
              />
              <TouchableOpacity onPress={this.togglePassword}>
                {this.showPassword ? <Eye cross /> : <Eye />}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity onPress={this.toggleAgree}>
              {this.agree ? <Circle type="success" /> : <Circle />}
            </TouchableOpacity>
            <Text style={styles.text}>
              I agree to the privacy policy & terms of use
            </Text>
          </View>
          <Button
            disabled={!this.allowToRegister}
            onPress={() => this.register(false)}
            title="create profile*"
            disabledStyle={styles.button}
            buttonStyle={styles.button}
            titleStyle={[styles.text]}
          />
          <Text style={[styles.text, styles.textCenter]}>
            *Your profile will be anonymous until you decide to make it public.
          </Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.text}>Or continue with</Text>
          <Button
            icon={<Google />}
            buttonStyle={styles.circleButton}
            onPress={() => this.register(true)}
          />
        </View>
      </View>
    );
  }

  toggleAgree = async () => {
    this.agree = !this.agree;
    this.checkToContinue();
  };

  togglePassword = () => {
    this.showPassword = !this.showPassword;
  };

  validate = async (field, value) => {
    let regex = null;
    switch (field) {
      case 'firstName':
      case 'lastName':
        regex = validation.nameRegex;
        break;
      case 'email':
        regex = validation.emailOrPhoneRegex;
        break;
      case 'password':
        regex = validation.passwordRegex;
        break;
    }
    if (regex) {
      this.validation[field] = regex.test(value);
    }
  };

  handleChange = async (field, text) => {
    this.form[field] = text;
    await this.validate(field, text);
    this.checkToContinue();
  };

  checkToContinue = () => {
    this.allowToRegister = Object.keys(this.validation)
      .map(key => this.validation[key])
      .reduce((a, b) => a && b, this.agree);
  };

  register = async (fromGoogle = false) => {
    if (fromGoogle) {
      await this.props.authService.loginWithGoogle();
    } else {
      if (!await this.props.authService.register(this.form)) {
        return;
      }
    }
    this.props.navigation.navigate('AuthLoading');
  };
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222222',
    paddingBottom: 24,
  },
  form: {
    alignItems: 'center',
  },
  formControl: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: Dimensions.get('window').width - 24,
    backgroundColor: '#333333',
    borderRadius: 8,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    color: 'white',
    flex: 1,
    padding: 0,
    fontSize: 18,
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
  },
  checkboxWrapper: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
  },
  textCenter: {
    marginVertical: 20,
    marginHorizontal: '10%',
    textAlign: 'center',
    textTransform: 'none',
  },
  header: {
    fontSize: 28,
  },
  button: {
    backgroundColor: 'rgb(0,89,136)',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    margin: 8,
    backgroundColor: 'white',
  },
});

export default Screen;
