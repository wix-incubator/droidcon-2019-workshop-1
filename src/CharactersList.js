import React from 'react';
import {FlatList, ActivityIndicator, View, StyleSheet, StatusBar} from 'react-native';
import ListItemCard from './CharacterListItem';
import * as MarvelApi from './service';

class CharactersList extends React.Component {
  state = {
    isLoading: true,
    characters: [],
    offset: 0
  };

  /**
   * There are few method that are being called throughout the lifecycle of a Component.
   *
   * componentDidMount is one of them - it runs after the component output has been rendered to the DOM.
   * This is a good place to fetch data remotely.
   *
   * To read more about common lifecycle methods:
   * https://reactjs.org/docs/react-component.html#commonly-used-lifecycle-methods
   */
  componentDidMount() {
    this._fetchCharacters();
  }

  /**
   * This is a component function but it's scope is not bound to 'this'.
   * Therefore if this function will be called within anonymous function, this will not reference to 'CharactersList' component.
   */
  _fetchCharacters() {
    this.setState({ isLoading: true });
    MarvelApi.fetchCharacters(this.state.offset).then(charactersData => {
      const results = charactersData.data.results;
      this.setState({
        characters:
          this.state.offset === 0
            ? results
            : [...this.state.characters, ...results],
        isLoading: false,
        offset: this.state.offset + this.state.characters.length
      });
    });
  }

  /**
   * Creating this type of function (ArrowFunction), makes the scope of the function to bound 'this'.
   * And now it's ok to use 'this.yourfunction()'.
   */
  _handleLoadMore = () => {
    if (!this.state.isLoading) {
      this._fetchCharacters();
    }
  };

  _renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  _removeCharacter = id => {
    // Update the state with the new characters array
  };

  _toggleFavorite = id => {
    this.setState({
      characters: this.sortCharacters(this.state.characters, id),
    });
  };

  filterCharacters(array, id) {
    // return a filtered array without item with above id
  }

  sortCharacters(array, id) {
    return array
      .map(item => {
        // Update item isFavorite accordingly
      })
      .sort((char1, char2) => {
        const char1Name = char1.name;
        const char2Name = char2.name;
        let nameSortValue = char1Name < char2Name ? -1 : char1Name > char2Name ? 1 : 0;
        if (char1.isFavorite && char2.isFavorite) {
          return nameSortValue;
        } else if (char1.isFavorite) {
          return -1;
        } else if (char2.isFavorite) {
          return 1;
        } else {
          return nameSortValue;
        }
      });
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#232020" />
        <FlatList
          data={this.state.characters}
          style={styles.list}
          keyExtractor={item => item.id.toString()}
          onEndReached={this._handleLoadMore}
          ListFooterComponent={this._renderFooter}
          onEndReachedThreshold={0.4}
          renderItem={({item}) => (
            <ListItemCard
              detail={item}
              isFavorite={item.isFavorite}
              onRemoveItem={this._removeCharacter}
              // Add The missing parts here
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#232020'
  }
});

export default CharactersList;
