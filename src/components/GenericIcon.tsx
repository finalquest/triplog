import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Rough from 'react-native-rough';
import { Svg } from 'react-native-svg';

export interface GenericIconProps extends TouchableOpacityProps {
  size: number; // Size of the icon (width and height)
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  roughness?: number;
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line';
  setOfPoints: number[][][];
  hachureGap?: number;
  hachureAngle?: number;
}

const GenericIcon: React.FC<GenericIconProps> = ({
  size,
  stroke = 'black',
  strokeWidth = 2,
  fill = 'gray',
  roughness = 1,
  fillStyle = 'zigzag',
  style,
  setOfPoints,
  hachureGap = 4,
  hachureAngle = 45,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest}>
      <Svg width={size} height={size} style={style}>
        {setOfPoints.map((points, index) => (
          <Rough.Polygon
            key={index}
            points={points}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            fillStyle={fillStyle}
            hachureGap={hachureGap}
            hachureAngle={hachureAngle}
            roughness={roughness}
          />
        ))}
      </Svg>
    </TouchableOpacity>
  );
};

export default GenericIcon;
