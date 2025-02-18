/**
 * @file NewsScreen.js
 * @description Fetches and displays the latest news articles using an RSS feed.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../assets/styles';
import * as rssParser from 'react-native-rss-parser';

/**
 * @function stripHtmlTags
 * @description Removes HTML tags from a string.
 * @param {string} str - The input string.
 * @returns {string} The string without HTML tags.
 */
const stripHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, '');
};

/**
 * @function NewsScreen
 * @description Screen component for displaying a list of news articles.
 * @param {Object} props - The props object.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @returns {React.ReactElement} A screen displaying news articles.
 */
const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const fetchRSSFeed = async () => {
    try {
      const response = await fetch('https://www.1garden.com/feed/');
      const text = await response.text();
      const rss = await rssParser.parse(text);
      setNews(rss.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => navigation.navigate('Article', { url: item.links[0].url })}
    >
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{new Date(item.published).toLocaleDateString()}</Text>
        <Text numberOfLines={3} style={styles.newsDescription}>
          {stripHtmlTags(item.description) || 'No description available.'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest News</Text>
      <Text style={styles.subTitle}>Explore the world of plants and nature.</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4caf50" />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNewsItem}
          contentContainerStyle={styles.newsList}
          ListEmptyComponent={<Text style={styles.emptyText}>No news available.</Text>}
        />
      )}
    </View>
  );
};

export default NewsScreen;
