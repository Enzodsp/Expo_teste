import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import PageInicial from './src/pages/PageInicial';
import PageContador from './src/pages/PageContador';
import PageTarefas from './src/pages/PageTarefas';

export default function App() {
  return (
    <PaperProvider>
      <PageTarefas />
    </PaperProvider>
  )
};

