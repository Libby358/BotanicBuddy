import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8f5e9', // Light green background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#388e3c', // Dark green
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'Cochin',
  },
  button: {
    backgroundColor: '#4caf50', // Green button color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c8e6c9', // Light green
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32', // Medium green
  },
  tabButton: {
    backgroundColor: '#4caf50', // Green button color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  tabButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  tabContentContainer: {
    flex: 1,
    marginTop: 20,
  },
  tabContent: {
    padding: 20,
    backgroundColor: '#c8e6c9', // Light green
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContentText: {
    fontSize: 16,
    color: '#2e7d32', // Medium green
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 15,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#2e7d32', // Medium green
    textAlign: 'center',
    marginBottom: 20, // Add margin-bottom for spacing
  },
  closeButton: {
    backgroundColor: '#4caf50', // Green button color
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    marginTop: 10,
  },
  cultivation: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
  },
  careInfo: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  plantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c8e6c9', // Light green
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32', // Medium green
    flexShrink: 1,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: '#555',
  },
  newsList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  explainerText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 15,
    textAlign: 'center',
  },
  helpIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  helpModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  helpModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  helpText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  plantImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },  
});
