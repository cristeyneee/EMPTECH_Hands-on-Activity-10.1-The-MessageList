import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const initialMessages = [
  { id: '1', type: 'location', latitude: 37.7749, longitude: -122.4194 },
  { id: '2', type: 'text', text: 'Hello' },
  { id: '3', type: 'text', text: 'World' },
  {
    id: '4',
    type: 'image',
    uri: 'https://cdn.shopify.com/s/files/1/0108/6465/6448/files/social_sharing_image.jpg?v=1682729367',
  },
];

export default function MessageList() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedImage, setSelectedImage] = useState(null);

  // 🔹 Delete text message
  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  // 🔹 Confirm delete
  const handleTextPress = (item) => {
    Alert.alert(
      'Delete Message',
      `Are you sure you want to delete "${item.text}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteMessage(item.id) },
      ],
      { cancelable: true }
    );
  };

  // 🔹 Open fullscreen image
  const handleImagePress = (uri) => {
    setSelectedImage(uri);
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'text':
        return (
          <TouchableOpacity onPress={() => handleTextPress(item)}>
            <View style={styles.messageRow}>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );

      case 'image':
        return (
          <View style={styles.messageRow}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleImagePress(item.uri)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
              </View>
            </TouchableOpacity>
          </View>
        );

      case 'location':
        return (
          <View style={styles.messageRow}>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} />
              </MapView>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar} />

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

      <View style={styles.ime} />

      {/* ✅ Fullscreen Image Modal with Android Back Button Support */}
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)} // 🔹 closes on back press
      >
        <View style={styles.modalBackground}>
          {/* Dark overlay to close */}
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setSelectedImage(null)} />
          {/* Image displayed above overlay */}
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  toolbar: { height: 60, backgroundColor: '#fff' },
  ime: { height: 60, backgroundColor: '#fff' },

  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 6,
    marginHorizontal: 10,
  },
  messageBubble: {
    backgroundColor: '#0078FF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    maxWidth: '75%',
  },
  messageText: { color: '#fff', fontSize: 16, flexShrink: 1 },

  imageContainer: {
    width: 240,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: '100%', borderRadius: 16 },

  mapContainer: { width: 260, height: 160, overflow: 'hidden' },
  map: { flex: 1 },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  mapContainer: {
    width: 260,
    height: 160,
    borderRadius: 0, 
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
