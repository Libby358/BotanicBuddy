import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import styles from '../assets/styles'; // Import your styles

const SettingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Buttons for Privacy and Security, Help, and About */}
      <TouchableOpacity style={styles.button} onPress={() => openModal('Privacy and Security')}>
        <Text style={styles.buttonText}>Privacy and Security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('Help')}>
        <Text style={styles.buttonText}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('About')}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>

      {/* Modal for displaying content */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalContent}</Text>
            <Text style={styles.modalText}>
              {modalContent === 'Privacy and Security' &&
                `We prioritize your privacy and security:
- The app does not store any personal information.
- Only plant images you upload are stored locally on your device.
- The app requires camera access solely for taking plant pictures, and this permission can be managed in your device settings.
- No data is shared with third parties.`}

              {modalContent === 'Help' &&
                `How the app works:
1. Take or select a picture of a plant.
2. The app uses an API to identify the plant species.
3. Another AI API provides brief care recommendations based on the plant's type.
4. You can save the plant details to your local collection for future reference.`}

              {modalContent === 'About' &&
                `About the app:
This app, Botanic Buddy, was developed as part of a university project. Its goal is to help users identify plants and learn how to care for them using AI-powered insights.`}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
