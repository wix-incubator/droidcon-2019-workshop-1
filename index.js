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
import { name as appName } from './app.json';

// Register the MainComponent -> 'CharactersList'
AppRegistry.registerComponent(appName, () => CharactersList);
