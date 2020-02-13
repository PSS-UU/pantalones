import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";

export const EmailInput = ({ onChangeText, value }) => {
  return (
    <TextInput
      autoCorrect={false}
      autoCapitalize="none"
      autoCompleteType="email"
      keyboardType="email-address"
      onChangeText={onChangeText}
      value={value}
      placeholder="Enter email..."
    />
  );
};

EmailInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string
};
