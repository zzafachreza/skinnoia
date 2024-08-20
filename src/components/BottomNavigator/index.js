import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { useState } from 'react';
import { getData, urlAPI } from '../../utils/localStorage';
import { useEffect } from 'react';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { MyDimensi, fonts } from '../../utils';
export default function BottomNavigator({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [cart, setCart] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {

    // if (isFocused) {
    //   getData('user').then(users => {
    //     axios.post(urlAPI + '/1_cart.php', {
    //       fid_user: users.id
    //     }).then(res => {
    //       console.log('cart', res.data);

    //       setCart(parseFloat(res.data))
    //     })
    //   })
    // }

  }, [])


  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{
      backgroundColor: Color.white[900], flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: Color.blueGray[100],
      height: 65,
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {
              key: 0
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        let Newlabel = '';

        if (label === 'Home') {
          iconName = 'home';
          Newlabel = 'Beranda';
        } else if (label === 'Imt') {
          iconName = 'speedometer-outline';
          Newlabel = 'IMT';
        } else if (label === 'TanyaJawab') {
          iconName = 'chatbubbles-outline';
          Newlabel = 'Tanya Jawab';
        } else if (label === 'Notifikasi') {
          iconName = 'notifications-outline';
          Newlabel = 'Notifikasi';
        } else if (label === 'Logout') {
          iconName = 'log-out-outline';
          Newlabel = 'Logout';
        } else if (label === 'Account') {
          iconName = 'person';
          Newlabel = 'Akun';

        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={
              label === 'Kategori'
                ? () =>
                  navigation.navigate('Barang', {
                    key: 0
                  })
                : onPress
            }
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{

                color: isFocused ? colors.primary : '#919095',
                paddingTop: 5,
                paddingBottom: 0,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>

              <View
                style={{
                  height: 65,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>

                <Icon type='ionicon' name={iconName} size={24} color={isFocused ? Color.primary[900] : Color.blueGray[400]} />
                <Text style={{
                  marginTop: 4,
                  fontFamily: fonts.body2.fontFamily,
                  textAlign: 'center',
                  fontSize: 12,
                  color: isFocused ? Color.primary[900] : Color.blueGray[400]
                }}>{Newlabel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: iconName => ({}),
});
