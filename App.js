import React from 'react';
import { StyleSheet, View } from 'react-native';
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
  };

  handlePressMessage = () => {};

  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style={styles.messageListContainer}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* STATUS AREA */}
        <Status />

        {/* MESSAGE LIST AREA */}
        {this.renderMessageList()}

        {/* TOOLBAR AREA (blank white space) */}
        <View style={styles.toolbar} />

        {/* INPUT METHOD EDITOR AREA (blank white space) */}
        <View style={styles.inputMethodEditor} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // Main message area
  messageListContainer: {
    flex: 2.5,
    marginBottom: 40, // space before IME
  },
  // Blank toolbar area
  toolbar: {
    flex: 0.4,
    backgroundColor: 'white',
  },
  // Blank IME area
  inputMethodEditor: {
    flex: 0.9,
    backgroundColor: 'white',
  },
});
