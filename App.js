import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, ActivityIndicator, Text } from 'react-native-paper';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-init';
import DrawerNavigator from './src/components/DrawerNavigator';
import LoginStackNavigator from './src/components/LoginStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuarioLogado } from './src/slices/usuarioLogadoSlice';
import useAuthService from './src/services/useAuthService';

export default function App() {

  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuarioLogado.usuarioLogado);
  const [loading, setLoading] = useState(true);
  const { buscarDadosUsuario } = useAuthService();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        let dadosFirestore = null;
        try {
          dadosFirestore = await buscarDadosUsuario(user.uid);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
        dispatch(setUsuarioLogado({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          ...(dadosFirestore || {}),
        }));
      } else {
        dispatch(setUsuarioLogado(null));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

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
