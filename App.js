// App.js
import React from 'react';
import { StyleSheet, View, Alert, Image, TouchableHighlight, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Status from './components/Status';
import MessageList from './components/MessageList';
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './utils/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullscreenImageId } = this.state;
      if (fullscreenImageId) {
        this.dismissFullscreenImage();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handlePressMessage = (item) => {
    const { id, type } = item;
    if (type === 'text') {
      Alert.alert('Delete message?', 'Do you want to delete this message?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            this.setState(prev => ({
              messages: prev.messages.filter(msg => msg.id !== id),
            }));
          },
        },
      ]);
    } else if (type === 'image') {
      this.setState({ fullscreenImageId: id });
    }
  };

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null;

    const image = messages.find(msg => msg.id === fullscreenImageId);
    if (!image) return null;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri: image.uri }} />
      </TouchableHighlight>
    );
  };

  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style={styles.messageListContainer}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Status />
        {this.renderMessageList()}
        <View style={styles.toolbar} />
        <View style={styles.inputMethodEditor} />
        {this.renderFullscreenImage()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  messageListContainer: { flex: 2.5, marginBottom: 40 },
  toolbar: { flex: 0.4, backgroundColor: 'white' },
  inputMethodEditor: { flex: 0.9, backgroundColor: 'white' },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
