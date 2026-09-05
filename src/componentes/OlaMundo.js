import { View, StyleSheet } from "react-native";
import { Card, Text, Button, Avatar } from "react-native-paper";

function OlaMundo() {
    return (
        <Card style={styles.card}>
            <Card.Title
                title="Bem-vindo"
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
            <Card.Content>
                <Text variant="bodyMedium">Olá Mundo!</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained">OK</Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    containerLaranja: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    card: {
        width: "90%",
    },
});

export default OlaMundo;