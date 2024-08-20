import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

export default function Splash({ navigation }) {

  const img = new Animated.Value(0.5);
  const text = new Animated.Value(50);
  Animated.timing(img, {
    toValue: 1,
    duration: 750,
    useNativeDriver: true,
  }).start();

  Animated.timing(text, {
    toValue: 0,
    duration: 750,
    useNativeDriver: true,
  }).start();

  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login')
        } else {
          // navigation.replace('GetStarted')
          navigation.replace('MainApp')
        }
      })
    }, 1200)
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.white,
      justifyContent: 'center',
      position: 'relative'

    }}>

      <LinearGradient style={{
        flex: 1,
      }} start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 0.6]}
        colors={[colors.primary, colors.secondary]}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',

        }}>

          <Animated.Image
            source={require('../../assets/logo.png')}
            resizeMode="contain"
            style={{
              transform: [
                { scale: img }
              ],
              width: windowWidth / 1.5,
              height: windowWidth / 1.5,

            }}
          />

          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 30,
            marginBottom: 20,
            color: colors.white
          }}>Skinnoia</Text>
          <ActivityIndicator color={colors.primary} size="large" />


        </View>

      </LinearGradient>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({});
