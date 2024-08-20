import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 2,
        height: windowWidth / 2,

      }}>
        <LinearGradient colors={[colors.primary, colors.secondary]} style={{
          width: windowWidth / 2,
          height: windowWidth / 2,
          borderRadius: 12,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 2.5, height: windowWidth / 2.5,
          }} />
        </LinearGradient>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>

      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  useEffect(() => {
    __getUser();
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      <View style={{
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: Color.primary[900]
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Image source={{
              uri: user.foto_user
            }} style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }} />
          </TouchableOpacity>
          <Text style={{
            left: 12,
            flex: 1,
            ...fonts.headline4,
            color: Color.white[900]
          }}>Halo, {user.nama_lengkap}</Text>
        </View>


      </View>

      <MyCarouser />

      <View style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <MyMenu onPress={() => navigation.navigate('Cek', user)} backgroundColor={colors.tertiary} img={require('../../assets/logo.png')} label="Deteksi Kondisi Kulit" />
      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})