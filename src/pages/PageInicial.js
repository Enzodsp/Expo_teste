import { View, StyleSheet } from 'react-native';
import Cabecalho from "../components/Cabecalho";
import CardInfo from "../components/CardInfo";
import BotaoDestaque from "../components/BotaoDestaque";

function PageInicial() {
    return (
        <View style={styles.container}>
            <Cabecalho />
            <View style={styles.conteudo}>
                <CardInfo />
                <BotaoDestaque />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    conteudo: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default PageInicial;
