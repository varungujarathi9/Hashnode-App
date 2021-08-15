import React, { Component } from 'react';
import { View, BackHandler, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#3678FA',
              },
              headerTitleStyle: {
                color: "#f4e530"
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}

export class Home extends Component {

  constructor(props) {
    super(props);
  }

  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }
  static navigationOptions = {
    title: 'Demo',
    headerStyle: {
      height: 10
    }
  };

  render(){
    return(
        <View style={{flex:1}}>
          <WebView
              ref={(webView) => { this.webView.ref = webView; }}
              onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
              automaticallyAdjustContentInsets={false}
              source={{uri: 'https://hashnode.com/community'}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              style={{marginTop: 0}}
            />
        </View>
    )
  }

}