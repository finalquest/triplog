import React from 'react';
import { View, StyleSheet } from 'react-native';
import RoughView from '../components/RoughView';
import strings from '../utils/strings';
import RoughButton from '../components/RoughButton';
import Label from '../components/Label';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  font: {},
});

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.flex}>
      <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={{ alignSelf: 'stretch' }}>
        <Label style={styles.font} numberOfLines={4}>
          {strings.login_box_title}
        </Label>
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
