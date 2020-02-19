import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export const PantModal = ({
  children,
  footer,
  headerText,
  triggerText,
  visible,
  setVisible
}) => {
  let [modalVisible, setModalVisible] = useState(false);
  if (visible !== undefined) {
    modalVisible = visible;
    setModalVisible = setVisible;
  }
  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalText}>{headerText}</Text>
          <Button
            style={styles.exitButton}
            title="x"
            onPress={() => setModalVisible(false)}
          />
        </View>
        <View style={styles.modalContent}>{children}</View>
        {footer && <View style={styles.modalFooter}>{footer}</View>}
      </Modal>

      <Button onPress={() => setVisible(true)} title={triggerText} />
    </View>
  );
};

PantModal.propTypes = {
  headerText: PropTypes.node.isRequired,
  triggerText: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
  modalHeader: {
    padding: 20,
    marginTop: 30,
    flexDirection: "row"
  },
  modalContent: {
    backgroundColor: "white",
    flex: 1
  },
  modalFooter: {
    padding: 20,
    marginBottom: 20
  }
});
