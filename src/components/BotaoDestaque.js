import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function BotaoDestaque() {
    return (
        <Button
            mode="contained"
            icon="send"
            style={styles.botao}
            labelStyle={styles.textoBotao}
            onPress={() => { }}
        >
            BOTAO
        </Button>
    );
}

const styles = StyleSheet.create({
    botao: {
        marginHorizontal: 16,
        marginVertical: 10,
        backgroundColor: '#6200ee',
        paddingVertical: 6,
        borderRadius: 25,
    },
    textoBotao: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});