import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Cabecalho() {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title="Minha Dashboard" titleStyle={styles.titulo} />
      <Appbar.Action icon="magnify" onPress={() => { }} />
      <Appbar.Action icon="dots-vertical" onPress={() => { }} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ee',
  },
  titulo: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});