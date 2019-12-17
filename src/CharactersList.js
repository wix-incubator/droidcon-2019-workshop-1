import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
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

  _removeCharacter = id => {};

  render() {
    return (
      <FlatList
        data={this.state.characters}
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        onEndReached={this._handleLoadMore}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.4}
        renderItem={({ item }) => (
          <ListItemCard
            detail={item}
            isFavorite={item.isFavorite}
            onRemoveItem={this._removeCharacter}
          />
        )}
      />
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
