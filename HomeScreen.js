/**
 * HomeScreen Component
 *
 * Provides functionality to capture or select an image, identify a plant using an external API, 
 * and save the identified plant details to local storage.
 *
 * @module HomeScreen
 * @requires React
 * @requires react-native
 * @requires @react-native-async-storage/async-storage
 * @requires expo-image-picker
 * @requires @expo/vector-icons
 * @requires uuid
 * @requires styles
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/styles';
import uuid from 'react-native-uuid'; 

/**
 * HomeScreen Component
 *
 * @param {Object} props - The component props.
 * @param {Object} props.navigation - The navigation object for navigating between screens.
 * @param {Object} [props.route] - The route object containing parameters passed to the screen.
 * @param {boolean} [props.route.params.refreshHome] - Determines whether to refresh the screen on navigation.
 * @returns {JSX.Element} The HomeScreen component.
 */

const HomeScreen = ({ navigation, route }) => {
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plantInfo, setPlantInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false); // State for help modal

  
  /**
   * Checks for camera or media library permissions.
   *
   * @async
   * @param {'camera' | 'gallery'} source - The source of the image (camera or gallery).
   * @returns {Promise<boolean>} - Whether the required permissions are granted.
   */
  const { refreshHome } = route.params || {};

  const checkPermissions = async (source) => {
    const permissions =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
    return permissions.granted;
  };


  /**
   * Allows the user to pick an image from the camera or gallery.
   *
   * @async
   * @param {'camera' | 'gallery'} source - The source of the image (camera or gallery).
   */

  const pickImage = async (source) => {
    const hasPermission = await checkPermissions(source);
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Access is needed to use this feature.');
      return;
    }
  
    const options = { mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 };
    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);
  
    if (!result.cancelled) {
      const image = result.assets[0];
      setSelectedImageURI(image.uri);
  
      try {
        const existingImages = await AsyncStorage.getItem('savedImages');
        const updatedImages = existingImages ? JSON.parse(existingImages) : [];
        updatedImages.push(image.uri);
        await AsyncStorage.setItem('savedImages', JSON.stringify(updatedImages));
        
        // Remove the following alert to avoid pop-up
        // Alert.alert('Success', 'Image saved successfully!');
      } catch (error) {
        console.error('Error saving image:', error);
        Alert.alert('Error', 'An error occurred while saving the image.');
      }
    }
  };

    /**
   * Identifies the plant from the selected image using the PlantNet API.
   *
   * @async
   */

  const identifyPlant = async () => {
    if (!selectedImageURI) {
      Alert.alert('No Image Selected', 'Please select an image first.');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('images', {
        uri: selectedImageURI,
        name: 'plant.jpg',
        type: 'image/jpeg',
      });

      const apiUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=2b103ud12aceCtJmrtfYtK4Y8u`;
      const response = await fetch(apiUrl, { method: 'POST', body: formData });
      const data = await response.json();

      console.log('PlantNet API Response:', data);

      if (data.results?.length > 0) {
        const topResult = data.results[0];
        const plantName =
          topResult.species?.commonNames?.[0] || 
          topResult.species?.slug || 
          'Unknown Plant';
        const plantFamily = topResult.species?.family?.scientificName || 'Unknown Family';

        const careInfo = await fetchPlantCareInfo(plantName) || 'No care information available.';

        setPlantInfo({
          name: plantName,
          family: plantFamily,
          care: careInfo,
        });
        setModalVisible(true);
      } else {
        Alert.alert('No Plant Found', 'Unable to identify the plant.');
      }
    } catch (error) {
      console.error('Error identifying plant:', error);
      Alert.alert('Error', 'An error occurred while identifying the plant.');
    } finally {
      setLoading(false);
    }
  };

    /**
   * Fetches care information for a plant using the OpenAI API.
   *
   * @async
   * @param {string} plantName - The name of the plant.
   * @returns {Promise<string>} - The plant care information.
   */

  const fetchPlantCareInfo = async (plantName) => {
    try {
      const prompt = `Provide brief plant care information for ${plantName}. Include:
- Light: [type of light]  
- Water: [watering frequency]  
- Soil: [soil type & pH]  
- Temperature: [ideal range]  
- Humidity: [humidity level]  
- Fertilizer: [type & frequency]  
- Toxicity: [to animals/children]  
- Lifespan: [average lifespan].  
Keep each answer to a few words.`;


  
      const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`, // Replace with a valid key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', 
          messages: [
            { role: 'system', content: 'You are a helpful plant care assistant.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 300, 
          temperature: 0.7,
        }),
      });
  
      const responseData = await openAiResponse.json();
      console.log('OpenAI API Response:', responseData);
  
      if (!responseData.choices || responseData.choices.length === 0) {
        throw new Error('No choices found in the API response.');
      }
  
      return responseData.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching plant care info:', error.message);
      return 'Unable to fetch care information at this time.';
    }
  };

  const savePlant = async () => {
    if (!plantInfo) return;
    try {
      const existingPlants = await AsyncStorage.getItem('savedPlants');
      const updatedPlants = existingPlants ? JSON.parse(existingPlants) : [];
  
      const plantToSave = {
        id: uuid.v4(), 
        ...plantInfo,
        image: selectedImageURI,
      };
  
      updatedPlants.push(plantToSave);
      await AsyncStorage.setItem('savedPlants', JSON.stringify(updatedPlants));
  
      Alert.alert('Success', 'Plant saved successfully!');
      setModalVisible(false);
  
    } catch (error) {
      console.error('Error saving plant:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Help Icon */}
      <TouchableOpacity
        style={styles.helpIcon}
        onPress={() => setHelpModalVisible(true)}
      >
        <Ionicons name="help-circle-outline" size={50} color="#4caf50" />
      </TouchableOpacity>

      <Text style={styles.title}>Botanic Buddy</Text>
      <TouchableOpacity style={styles.button} onPress={() => pickImage('camera')}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => pickImage('gallery')}>
        <Text style={styles.buttonText}>Choose from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={identifyPlant}>
        <Text style={styles.buttonText}>Identify Plant</Text>
      </TouchableOpacity>
      {selectedImageURI && (
        <Image source={{ uri: selectedImageURI }} style={styles.selectedImage} />
      )}
      {loading && <ActivityIndicator size="large" color="#4caf50" />}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.plantName}>Name: {plantInfo?.name}</Text>
            <Text style={styles.plantFamily}>Family: {plantInfo?.family}</Text>
            <Text style={styles.careInfo}>{plantInfo?.care}</Text>
            <TouchableOpacity style={styles.button} onPress={savePlant}>
              <Text style={styles.buttonText}>Save Plant</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Ignore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Help Modal */}
      <Modal visible={helpModalVisible} transparent={true} animationType="fade">
        <View style={styles.helpModalContainer}>
          <View style={styles.helpModalContent}>
            <Text style={styles.helpText}>
              Welcome to Botanic Buddy! Use the buttons to:
              {'\n'}- Take a photo of a plant or choose one from your gallery.
              {'\n'}- Identify the plant and get care instructions.
              {'\n'}- Save the plant to your collection.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setHelpModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
