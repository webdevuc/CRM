/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
    en,
    nl,
   de,
    pl,
   pt,
   enGB,
   registerTranslation,
 } from 'react-native-paper-dates'
 registerTranslation('en', en)
 registerTranslation('nl', nl)
 registerTranslation('pl', pl)
 registerTranslation('pt', pt)
 registerTranslation('de', de)
 registerTranslation('en-GB', enGB)

 if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

AppRegistry.registerComponent(appName, () => App);
