import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ImageBackground, SafeAreaView, Alert } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For saving user data locally

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleRegister = async () => {
    try {
      // Password validation
      const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
      };

      if (!validatePassword(password)) {
        console.log('Password validation failed');
        Alert.alert(
          'Error',
          'Password must be at least 8 characters long, contain at least one capital letter and one number. with special characters: ' 
        );
        console.log(password)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Password must be at least 8 characters long, contain at least one capital letter and one number.',
          topOffset: 20,
        });
        return; // Stop registration if password is invalid
      }

      // Save user data locally if the password is valid
      await AsyncStorage.setItem('userData', JSON.stringify({ username, email, password }));

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account created successfully!',
        topOffset: 20,
      });

      // Navigate to the next screen
      setTimeout(() => navigation.navigate('Preferences'), 2000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
        topOffset: 20,
      });
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea} >
      <ScrollView contentContainerStyle={styles.container}>
        <Toast />

        {/* Banner Section */}
        <ImageBackground
          style={styles.headerContainer}
          resizeMode="cover"
        >
          <Text style={styles.helloText}>Hello There</Text>
          <Text style={styles.subText}>
            Welcome! Let’s get you all set up so you can start using the app.
          </Text>
        </ImageBackground>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={24} color="#fdb15a" style={styles.inputIcon} />
            <TextInput
              placeholder="Username"
              style={styles.input}
              placeholderTextColor="#fdb15a"
              onChangeText={setUsername}
              value={username}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={24} color="#fdb15a" style={styles.inputIcon} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#fdb15a"
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={24} color="#fdb15a" style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor="#fdb15a"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          {/* Terms & Conditions */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
              color={checked ? '#fdb15a' : '#666'}
            />
            <Text style={styles.checkboxText}>I accept the terms and conditions</Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider with "Sign Up with" */}
          <View style={styles.signUpSection}>
            <View style={styles.line} />
            <Text style={styles.signUpText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Media Icons */}
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome name="google" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome name="apple" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialCommunityIcons name="facebook" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    width: '100%',
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fdb15a',
  },
  helloText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 0,
    marginTop: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    zIndex: 20,
    position: 'absolute',
    top: 220,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#fdb15a',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fdb15a',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  checkboxText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: '#fdb15a',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#fdb15a',
  },
  signUpText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#666',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '95%',
    letterSpacing: 20,
  },
  socialIcon: {
    backgroundColor: '#fdb15a',
    borderRadius: 10,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
  },
  loginLink: {
    color: '#fdb15a',
    fontWeight: 'bold',
  },
});
