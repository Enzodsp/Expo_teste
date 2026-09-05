import { View, StyleSheet } from 'react-native';
import Cabecalho from "../componentes/Cabecalho";
import CardInfo from "../componentes/CardInfo";
import BotaoDestaque from "../componentes/BotaoDestaque";

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