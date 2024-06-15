

import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import LoginScreen from './src/LoginScreen';
import SearchScreen from './src/SearchScreen';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <SearchScreen />
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

