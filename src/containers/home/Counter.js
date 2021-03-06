import React, { Component } from 'react'
import { View, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Text, Button } from 'react-native-paper'
import { withRouter } from 'react-router-native'
import codePush from 'react-native-code-push'

import homeDucks from 'reducers/home'

class Counter extends Component {
  state = {
    code_status  : 'ESPERANDO....',
    code_progress: '0%'
  }

  codePushStatusDidChange(status) {
    console.log('codePushStatusDidChange: ', status);
    this.setState({
      code_status: status
    })
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.')
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.')
        break
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.')
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.')
        break
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log('codePushDownloadDidProgress: ', progress.receivedBytes + ' of ' + progress.totalBytes + ' received.')
    this.setState({
      code_progress: progress.receivedBytes + ' of ' + progress.totalBytes + ' received.'
    })
  }

  render() {
    const {
      home: { counter },
      addCounter,
      removeCounter
    } = this.props

    const { code_status, code_progress } = this.state

    return (
      <View>
        <Text>HOLAAAAAAAAAA</Text>
        <Text>{counter}</Text>
        <Text>{code_status}</Text>
        <Text>{code_progress}</Text>
        <Button >Action 1</Button>
        <Button >Action 2</Button>
        <Button >Action 3</Button>
        <Button onPress={() => addCounter()}>Add</Button>
        <Button onPress={() => removeCounter()}>Remove</Button>
        <Button onPress={() => this.props.history.push('/home/detail')}>Detalle</Button>
        <Button onPress={this._handleButtonPress}>Actualizar aplicación</Button>
      </View>
    )
  }

  _handleButtonPress = () => {
    codePush.sync({
      updateDialog: true,
      installMode : codePush.InstallMode.IMMEDIATE
    })
  }
}

export default connect(
  ({ home }) => ({ home }),
  { addCounter: homeDucks.creators.addCounter, removeCounter: homeDucks.creators.removeCounter }
)(withRouter(codePush({ checkFrequency: codePush.CheckFrequency.MANUAL })(Counter)))
