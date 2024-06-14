import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface LabelProps extends TextProps {}

const styles = StyleSheet.create({
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

const Label: React.FC<LabelProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={[styles.font, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Label;
