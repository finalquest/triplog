import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RoughView from '../components/RoughView';
import strings from '../utils/strings';
import RoughButton from '../components/RoughButton';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  font: {
    fontFamily: 'GochiHand-Regular',
    fontSize: 25,
    color: 'black',
    alignSelf: 'stretch',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 10,
  },
});

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.flex}>
      <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={{ alignSelf: 'stretch' }}>
        <Text style={styles.font} numberOfLines={4}>
          {strings.login_box_title}
        </Text>
      </RoughView>
      <RoughButton
        onPress={() => navigation.navigate('Home')}
        style={{ alignSelf: 'stretch', height: 80 }}
        fillWeight={3}
        strokeWidth={5}
        fill="gray"
        hachureAngle={50}
        hachureGap={5}
        roughness={2}
        fillStyle={'zigzag'}
        text={{ color: 'white', size: 30 }}>
        {strings.login_button_title}
      </RoughButton>
    </View>
  );
};

export default LoginScreen;
