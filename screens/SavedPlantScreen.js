/**
 * SavedPlantsScreen Component
 *
 * Displays a list of saved plants and allows users to view plant details or delete them.
 *
 * @module SavedPlantsScreen
 * @requires React
 * @requires react-native
 * @requires @react-native-async-storage/async-storage
 * @requires @expo/vector-icons
 * @requires styles
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import styles from '../assets/styles';

/**
 * SavedPlantsScreen Component
 *
 * @param {Object} props - The component props.
 * @param {Object} props.navigation - The navigation object for navigating between screens.
 * @returns {JSX.Element} The SavedPlantsScreen component.
 */

const SavedPlantsScreen = ({ navigation }) => {
  const [savedPlants, setSavedPlants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Fetches the list of saved plants from AsyncStorage.
   *
   * @async
   */


  const fetchSavedPlants = useCallback(async () => {
    try {
      const plants = await AsyncStorage.getItem('savedPlants');
      setSavedPlants(plants ? JSON.parse(plants) : []);
    } catch (error) {
      console.error('Error fetching saved plants:', error);
    }
  }, []);

  // Show plant details in modal
  const showPlantDetails = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

   /**
   * Deletes a plant by its ID.
   *
   * @async
   * @param {string} plantId - The ID of the plant to delete.
   */


  const deletePlant = async (plantId) => {
    try {
      const filteredPlants = savedPlants.filter(plant => plant.id !== plantId);

      await AsyncStorage.setItem('savedPlants', JSON.stringify(filteredPlants));

      setSavedPlants(filteredPlants);
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity onPress={() => showPlantDetails(item)}>
      <View style={styles.plantItem}>
        <Image source={{ uri: item.image }} style={styles.plantImage} />
        <Text style={styles.plantName}>{item.name}</Text>
        <TouchableOpacity onPress={() => deletePlant(item.id)}>
          <Ionicons name="trash-bin" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  /**
   * Refreshes the list of saved plants.
   *
   * @async
   */

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSavedPlants().then(() => setRefreshing(false));
  }, [fetchSavedPlants]);

  useEffect(() => {
    fetchSavedPlants();
  }, [fetchSavedPlants]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Plants</Text>
      <FlatList
        data={savedPlants}
        keyExtractor={(item, index) => item.id || `${item.name}-${index}`}
        renderItem={renderPlantItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No plants saved yet!</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Modal for Plant Details */}
      {selectedPlant && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedPlant.imageUri && (
                <Image source={{ uri: selectedPlant.imageUri }} style={styles.selectedImage} />
              )}
              <Text style={styles.greenPlantName}>Name: {selectedPlant.name}</Text>
              <Text style={styles.plantFamily}>Family: {selectedPlant.family}</Text>
              <Text style={styles.careInfo}>{selectedPlant.care}</Text>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SavedPlantsScreen;
