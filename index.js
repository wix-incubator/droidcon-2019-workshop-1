/**
 * @format
 * This file will serve as the common entry point for both Android and iOS projects.
 */

/**
 * AppRegistry is the JS entry point to running all React Native apps.
 * App root components should register themselves with AppRegistry.registerComponent,
 * then the native system can load the bundle for the app and
 * then actually run the app when it's ready by invoking AppRegistry.runApplication.
 */
import { AppRegistry } from 'react-native';
import CharactersList from './src/CharactersList';
import HeroDetails from './src/HeroDetails';
import { name as appName } from './app.json';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useScreens } from 'react-native-screens';

useScreens();

/**
 * `createStackNavigator` Provides a way for your app to transition between screens where each new screen is placed on top of a stack.
 * By default the stack navigator is configured to have the familiar iOS and Android look & feel:
 * new screens slide in from the right on iOS, fade in from the bottom on Android.
 * On iOS the stack navigator can also be configured to a modal style where screens slide in from the bottom.
 *
 * To read more:
 * https://reactnavigation.org/docs/en/stack-navigator.html
 */
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: CharactersList,
      navigationOptions: {
        title: 'Super Heroes'
      }
    },
    Details: {
      screen: HeroDetails,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.hero.name
      })
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3a3535'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

// Register the MainComponent -> 'CharactersList'
AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator));
