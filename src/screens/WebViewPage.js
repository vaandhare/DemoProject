import {StyleSheet, View, BackHandler, Platform} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {WebView} from 'react-native-webview';

const WebViewPage = ({navigation}) => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
    }
  }, [canGoBack]);

  const HandleBackPressed = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
    } else navigation.goBack();
    return true;
  };

  const handleState = navState => {
    setCanGoBack(navState.canGoBack);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://google.com/',
        }}
        onNavigationStateChange={handleState}
        style={styles.webView}
      />
    </View>
  );
};

export default WebViewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
