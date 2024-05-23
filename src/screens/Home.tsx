import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Rough from 'react-native-rough';
import RoughView from '../components/RoughView';
import strings from '../utils/strings';
import AddMore from '../../assets/imgs/add-sign-bold.svg';
import { Svg } from 'react-native-svg';

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

const width = 100;
const padding = 20;

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
        <AddMore width={50} height={50} strokeWidth={50} />
        <Svg pointerEvents="none" width={width} height={width}>
          <Rough.Circle
            x={50}
            y={width / 2}
            diameter={width - padding}
            hachureAngle={60}
            hachureGap={5}
            fillWeight={3}
            stroke="black"
            strokeWidth={5}
            fill="gray"
          />
          <Rough.Line x1={padding} y1={width / 2} x2={width - padding} y2={width / 2} stroke="black" strokeWidth={5} />
          <Rough.Line x1={width / 2} y1={padding} x2={width / 2} y2={width - padding} stroke="black" strokeWidth={5} />
        </Svg>
      </RoughView>
    </View>
  );
};

export default Home;
