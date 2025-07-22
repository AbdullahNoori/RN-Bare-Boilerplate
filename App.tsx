/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './ReactotronConfig';

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        setData(JSON.stringify(json, null, 2));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Unknown error');
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {loading && (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
      {error && (
        <View>
          <Text>Error: {error}</Text>
        </View>
      )}
      {data &&
        (() => {
          const parsed = JSON.parse(data);
          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Dummy API Result</Text>
              <Text>
                <Text style={styles.label}>ID:</Text> {parsed.id}
              </Text>
              <Text>
                <Text style={styles.label}>Title:</Text> {parsed.title}
              </Text>
              <Text>
                <Text style={styles.label}>Completed:</Text>{' '}
                {parsed.completed ? 'Yes' : 'No'}
              </Text>
              <Text>
                <Text style={styles.label}>User ID:</Text> {parsed.userId}
              </Text>
            </View>
          );
        })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 250,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
});

export default App;
