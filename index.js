/** @format */

import 'core-js/es6/map'
import 'core-js/es6/symbol'
import 'core-js/fn/symbol/iterator'

import { AppRegistry } from 'react-native'
import codePush from 'react-native-code-push'

import App from './src'
import { name as appName } from './app.json'

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
}

AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App))
