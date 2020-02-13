import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

export const PasswordInput = ({ onChangeText, value }) => {
  return (
    <TextInput
      secureTextEntry
      autoCorrect={false}
      autoCompleteType="password"
      onChangeText={onChangeText}
      value={value}
      placeholder="Enter password..."
    />
  );
};

PasswordInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string
};
