import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RoughView from '../components/RoughView';
import strings from '../utils/strings';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
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

const Home = () => {
  return (
    <View style={styles.flex}>
      <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={{ alignSelf: 'stretch', height: 100, justifyContent: 'center' }}>
        <Text style={styles.font} numberOfLines={4}>
          {strings.home_box_title}
        </Text>
      </RoughView>
      <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={{ alignSelf: 'stretch', flex: 1, justifyContent: 'center' }}>
        <Text style={styles.font} numberOfLines={4}>
          {strings.home_last_action}
        </Text>
      </RoughView>
    </View>
  );
};

export default Home;
