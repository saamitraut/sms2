import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import DeviceInfo from 'react-native-device-info';
// import {useDispatch} from 'react-redux';

// import * as authAction from '../redux/actions/authAction';

const formSchema = yup.object({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});
//

const RegisterScreen = navData => {
  // const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
        }}
        validationSchema={formSchema}
        onSubmit={values => {
          console.log(values);

          var InsertAPIURL = 'http://103.219.0.103/api/insert.php';
          let deviceId = DeviceInfo.getUniqueId();
          var data = new FormData();

          data.append('email', values.email);
          data.append('fullName', values.fullName);
          data.append('password', values.password);
          data.append('deviceId', deviceId);

          console.log(data);
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;

          xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
              let response = JSON.parse(this.responseText);
              console.log(response);

              if (response.success == 'true') {
                navData.navigation.navigate('Home');
              } else {
                alert(response.Message);
              }
            }
          });
          //

          xhr.open('POST', InsertAPIURL);

          xhr.send(data);
        }}
        // onSubmit={values => {
        //   dispatch(authAction.registerUser(values))
        //     .then(result => {
        //       if (result.success) {
        //         navData.navigation.navigate('Home');
        //       } else {
        //         Alert.alert('Registration failed. Try Again');
        //       }
        //     })
        //     .catch(err => console.log(err));
        // }}
      >
        {props => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.image}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange('fullName')}
                value={props.values.fullName}
                onBlur={props.handleBlur('fullName')}
                autoCorrect={false}
              />
              <Text style={styles.error}>
                {props.touched.fullName && props.errors.fullName}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
                autoCapitalize="none"
              />
              <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Have an account?</Text>
                <TouchableOpacity
                  onPress={() => navData.navigation.navigate('Login')}>
                  <Text style={styles.registerButton}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    width: 300,
    backgroundColor: '#B6BFC4',
    borderRadius: 25,
    padding: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#738289',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  registerContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  registerText: {
    color: '#738289',
    fontSize: 16,
  },
  registerButton: {
    color: '#738289',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
});

export default RegisterScreen;
