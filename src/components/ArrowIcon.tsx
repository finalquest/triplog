import React from 'react';
import GenericIcon, { GenericIconProps } from './GenericIcon';

interface RoughArrowIconProps extends Omit<GenericIconProps, 'setOfPoints'> {}

const RoughArrowIcon: React.FC<RoughArrowIconProps> = ({ size, ...props }) => {
  // Define the points for the arrow polygon
  const points = [
    [
      [0.5 * size, 0], // Arrow tip (top center)
      [0.75 * size, 0.4 * size], // Right middle (near top)
      [0.6 * size, 0.4 * size], // Right inner middle (near top)
      [0.6 * size, size], // Bottom right
      [0.4 * size, size], // Bottom left
      [0.4 * size, 0.4 * size], // Left inner middle (near top)
      [0.25 * size, 0.4 * size], // Left middle (near top)
      [0.5 * size, 0], // Arrow tip (back to top center)
    ],
  ];

  return <GenericIcon size={size} setOfPoints={points} {...props} />;
};

export default RoughArrowIcon;
