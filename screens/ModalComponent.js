/**
 * @file ModalComponent.js
 * @description A reusable modal component with customizable title and content.
 */

import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles'; // Adjust the path if needed

/**
 * @function ModalComponent
 * @description Renders a modal with a title, content, and close button.
 * @param {Object} props - The props object.
 * @param {boolean} props.visible - Determines if the modal is visible.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {string} props.title - The title displayed in the modal.
 * @param {React.ReactNode} props.children - The content of the modal.
 * @returns {React.ReactElement} A modal component.
 */
const ModalComponent = ({ visible, onClose, title, children }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.modalBody}>{children}</View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
