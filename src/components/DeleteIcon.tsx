import React from 'react';
import GenericIcon, { GenericIconProps } from './GenericIcon';

interface DeleteIconProps extends Omit<GenericIconProps, 'setOfPoints'> {}

const DeleteIcon: React.FC<DeleteIconProps> = ({ size, ...props }) => {
  const points = [
    [
      [5.9 * (size / 25), 24.4 * (size / 24.8)], // Bottom left
      [18.7 * (size / 25), 24.4 * (size / 24.8)], // Bottom right
      [19.8 * (size / 25), 7 * (size / 24.8)], // Top right of can body
      [4.9 * (size / 25), 7 * (size / 24.8)], // Top left of can body
      [5.9 * (size / 25), 24.4 * (size / 24.8)], // Back to Bottom left
    ],
    [
      [19.1 * (size / 25), 0.7 * (size / 24.8)], // Top right
      [14.4 * (size / 25), 1.6 * (size / 24.8)], // Right handle
      [13.6 * (size / 25), 0.2 * (size / 24.8)], // Left handle
      [8.2 * (size / 25), 1.3 * (size / 24.8)], // Top left
      [8 * (size / 25), 3 * (size / 24.8)], // Top left inner
      [3.3 * (size / 25), 4 * (size / 24.8)], // Top left outer
      [3.5 * (size / 25), 8.7 * (size / 24.8)], // Bottom left outer
      [20.8 * (size / 25), 5.2 * (size / 24.8)], // Bottom right outer
      [19.1 * (size / 25), 0.7 * (size / 24.8)],
    ],
  ];

  return <GenericIcon size={size} setOfPoints={points} {...props} />;
};

export default DeleteIcon;
