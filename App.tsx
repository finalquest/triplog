import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  LogBox,
} from 'react-native';
import Svg from 'react-native-svg';
import Rough from 'react-native-rough';
import RoughButton from './src/components/RoughButton';
import RoughView from './src/components/RoughView';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  font: {
    fontFamily: 'GochiHand-Regular',
    fontSize: 25,
    color: 'black',
    alignSelf: 'stretch',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  preview: {
    width,
    height: width,
  },
  activeRow: {
    padding: 10,
    backgroundColor: '#F5F7FF',
  },
  row: {
    padding: 10,
  },
  rowTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#606C71',
  },
  divider: {
    marginLeft: width * 0.05,
    width: width * 0.9,
    backgroundColor: '#2222220F',
    height: 1,
  },
  centerAlign: {
    textAlign: 'center',
  },
  title: {
    fontSize: 40,
    color: '#169958',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 5,
    color: '#606C71',
  },
});

const RectangleExample = () => (
  <Rough.Rectangle
    x={20}
    y={20}
    width={width - 40}
    height={width - 40}
    fillWeight={3}
    stroke="red"
    strokeWidth={5}
    fill="blue"
    roughness={5}
    fillStyle={'cross-hatch'}
  />
);

const ArcExample = () => (
  <Rough.Arc
    seed={10}
    x={width * 0.5}
    y={width * 0.5}
    closed
    width={width - 2 * 50}
    height={width - 2 * 50}
    start={0}
    stop={2 * Math.PI}
    fillStyle="zigzag"
    strokeWidth={4}
    stroke="orange"
    fill="rgba(255,0,255,0.4)"
  />
);

const EllipseExample = () => (
  <Rough.Ellipse
    x={width * 0.5}
    y={width * 0.5}
    width={width - 40}
    height={width * 0.5}
    hachureAngle={60}
    hachureGap={15}
    fillWeight={3}
    stroke="red"
    strokeWidth={5}
    fill="blue"
  />
);

const CircleExample = () => (
  <Rough.Circle
    x={width * 0.5}
    y={width * 0.5}
    diameter={width - 40}
    hachureAngle={60}
    hachureGap={15}
    fillWeight={3}
    stroke="red"
    strokeWidth={5}
    fill="blue"
  />
);

const LineExample = () => (
  <Rough.Line
    x1={20}
    y1={20}
    x2={width - 40}
    y2={width - 40}
    stroke="purple"
    strokeWidth={5}
  />
);

const LinearPathExample = () => (
  <Rough.LinearPath
    points={[
      [0, 20],
      [50, 20],
      [width, width],
    ]}
    strokeWidth={5}
    stroke="pink"
  />
);

const CurveExample = () => {
  let points = [];
  for (let i = 0; i < 20; i++) {
    let x = (width / 20) * i + 10;
    let xdeg = (Math.PI / 100) * x;
    let y = Math.round(Math.sin(xdeg) * width * 0.5 * 0.8) + width * 0.5;
    points.push([x, y]);
  }
  return <Rough.Curve points={points} strokeWidth={5} stroke="pink" />;
};

const PolygonExample = () => (
  <Rough.Polygon
    points={[
      [0, 20],
      [50, 20],
      [width, width],
    ]}
    strokeWidth={5}
    stroke="pink"
    fill="red"
    fillStyle="dots"
  />
);

export default () => {
  const [index, setIndex] = useState(0);
  const [rows] = useState([
    // ["Arc", "Renders an hand-drawn style arc. You know, like a pie chart?", ArcExample],
    // ["Circle", "Draws a rough circle.", CircleExample],
    // ["Curve", "Like a LinearPath, but the points are smoothly interpolated between.", CurveExample],
    // ["Ellipse", "Renders an ellipse. This is like a Circle, but you can have different width and height.", EllipseExample],
    // ["Line", "Draws a cool, hand-drawn looking line between two points.", LineExample],
    // ["LinearPath", "Draw a line between array of points.", LinearPathExample],
    // ["Polygon", "Like a LinearPath, but the points are smoothly interpolated between using Bezier curves.", PolygonExample],
    ['Rectangle', 'Sketches a rough rectangle.', RectangleExample],
  ]);
  const Example = rows[index][2];
  return (
    <View style={StyleSheet.absoluteFill}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.flex}>
          <RoughView
            style={{ alignSelf: 'stretch', flex: 1 }}
            fillWeight={3}
            stroke="pink"
            strokeWidth={5}
            hachureAngle={50}
            hachureGap={10}
            roughness={4}>
            <RoughButton
              style={{
                alignSelf: 'stretch',
                height: 100,
                justifyContent: 'center',
              }}
              fillWeight={3}
              stroke="brown"
              strokeWidth={5}
              fill="lightblue"
              hachureAngle={50}
              hachureGap={10}
              roughness={4}
              fillStyle={'cross-hatch'}>
              <Text style={styles.font} numberOfLines={4}>
                This text uses a thin italic raleway font
              </Text>
            </RoughButton>
            <RoughButton
              style={{ alignSelf: 'stretch', height: 100 }}
              fillWeight={3}
              stroke="yellow"
              strokeWidth={5}
              fill="lightblue"
              hachureAngle={50}
              hachureGap={10}
              roughness={4}
              fillStyle={'dashed'}
            >
              <Text style={styles.font} numberOfLines={4}>
                This text uses a thin italic raleway font
              </Text>
            </RoughButton>
            <RoughButton
              style={{ alignSelf: 'stretch', height: 100 }}
              fillWeight={3}
              stroke="brown"
              strokeWidth={5}
              fill="lightblue"
              hachureAngle={50}
              hachureGap={10}
              roughness={4}
              fillStyle={'zigzag'}>
              <Text style={styles.font} numberOfLines={4}>
                This text uses a thin italic raleway font
              </Text>
            </RoughButton>
          </RoughView>
        </View>
      </SafeAreaView>
    </View>
  );
};

LogBox.ignoreAllLogs(true);
