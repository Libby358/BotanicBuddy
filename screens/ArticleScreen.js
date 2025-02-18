/**
 * @file ArticleScreen.js
 * @description Displays a web view for an article using a passed URL parameter.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * @function ArticleScreen
 * @description Screen component for rendering a web page using a passed URL.
 * @param {Object} props - The props object.
 * @param {Object} props.route - The route object containing parameters.
 * @param {string} props.route.params.url - The URL of the article to display.
 * @returns {React.ReactElement} A view containing the web page.
 */
const ArticleScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ArticleScreen;
