import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Card, Button, Text } from 'react-native-ui-lib';

const deleteIcon = require('../img/delete.png');
const favorite = require('../img/favorite.png');
const favoriteSelected = require('../img/favorite_selected.png');

/**
 * React.PureComponent vs React.Component
 *
 * React.PureComponent is similar to React.Component.
 * The difference between them is that React.Component doesn’t implement shouldComponentUpdate(),
 * but React.PureComponent implements it with a shallow prop and state comparison.
 *
 * If your React component’s render() function renders the same result given the same props and state,
 * you can use React.PureComponent for a performance boost in some cases.
 */
export default class CharacterListItem extends React.PureComponent {
  render() {
    let img =
      this.props.detail.thumbnail.path +
      '/portrait_medium.' +
      this.props.detail.thumbnail.extension;
    let name = this.props.detail.name;
    let desc = this.props.detail.description
      ? this.props.detail.description
      : 'no description';
    return (
      <Card row height={150} style={styles.card} onPress={this.props.onPress}>
        <Card.Image width={100} imageSource={{ uri: img }} />
        <View padding-20 flex>
          <Text text70 white numberOfLines={1}>
            {name}
          </Text>

          {/* Add the subtitle here, it could be the description :)
            use UILib modifiers and the {styles} */}

          <View row style={styles.btn}>
            {/* The button sets few modifiers and few props,
             as we can see it takes 'text90','link' and 'red30' those are the modifiers.
             In addition some props like: 'onPress'.
             You can pass any data you wish to a props also a method :) */}
            <Button
              text90
              link
              red30
              iconSource={deleteIcon}
              label='Remove'
              // The best practice is to pass the method itself and not a anonymous method like that :)
              // Take your chance and change it.
              onPress={() => this.props.onRemoveItem(this.props.detail.id)}
            />

            {/* Add the favorite button here, you can use {favorite} and {favoriteSelected} icons :)*/}
          </View>
        </View>
      </Card>
    );
  }
}

/**
 * A StyleSheet is an abstraction similar to CSS StyleSheets.
 *
 * 1. Instead of creating a new style object every time, StyleSheet helps to
 * create style objects with an ID which is further used to reference instead rendering it again.
 *
 * 2. Moving code outside the render() helps in achieving the better understanding of code and adds meaning to low-level components.
 *
 * 3. The stylesheet is sent only once over the bridge unlike normal style object inside render().
 */
const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#3a3535'
  },
  testDesc: {
    height: 60,
    marginBottom: 15
  },
  btn: {
    alignSelf: 'flex-end'
  }
});
