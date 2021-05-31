// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

class AlbumsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { albums: [] };
  }

  componentDidMount() {
    this._getAlbumsAsync();
  }

  _getAlbumsAsync = async () => {
    let { status } = await MediaLibrary.getPermissionsAsync();
    if (status === 'granted') {
      let albums = await MediaLibrary.getAlbumsAsync();

      let result = await Promise.all(
        albums.map(async album => {
          let media = await MediaLibrary.getAssetsAsync(album.id, {
            first: 1,
          });
          return { ...album, thumbnail: media.assets[0] };
        })
      );

      this.setState({ albums: result });
    }
  };

  render() {
    // console.log('render : ', this.state.albums);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              You are on Albums Screen
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default AlbumsScreen;
