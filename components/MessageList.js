// MessageList.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MessageList({ messages, onPressMessage }) {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'text':
        return (
          <View style={styles.messageRow}>
            <TouchableOpacity onPress={() => onPressMessage(item)}>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );

      case 'image':
        return (
          <View style={styles.messageRow}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onPressMessage(item)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
              </View>
            </TouchableOpacity>
          </View>
        );

      case 'location':
        return (
          <View style={styles.messageRow}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onPressMessage(item)}>
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
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    height: 60,
    backgroundColor: '#fff',
  },
  ime: {
    height: 60,
    backgroundColor: '#fff',
  },
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
  messageText: {
    color: '#fff',
    fontSize: 16,
    flexShrink: 1,
  },
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
  image: {
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
