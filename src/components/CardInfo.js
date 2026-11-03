import { StyleSheet } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

export default function CardInfo() {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="TITULO"
        subtitle="subtitulo"
        left={(props) => <Avatar.Icon {...props} icon="chart-donut" style={styles.icone} />}
      />
      <Card.Content>
        <Text variant="bodyLarge" style={styles.texto}>
          Card Informativo
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    elevation: 4,
  },
  icone: {
    backgroundColor: '#03dac6',
  },
  texto: {
    color: '#333333',
    lineHeight: 20,
  },
});