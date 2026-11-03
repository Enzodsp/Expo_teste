import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, ActivityIndicator, Text } from 'react-native-paper';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-init';
import DrawerNavigator from './src/components/DrawerNavigator';
import LoginStackNavigator from './src/components/LoginStackNavigator';

export default function App() {

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUsuario(user);
      } else {
        setUsuario(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <PaperProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" animating={true} color="#0066cc" />
          <Text style={styles.loadingText}>Verificando autenticação...</Text>
        </View>
      </PaperProvider>
    );
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        {usuario ? (
          <DrawerNavigator deslogar={() => signOut(auth)} />
        ) : (
          <LoginStackNavigator />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
