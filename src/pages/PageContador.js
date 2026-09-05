import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BotaoContador from "../componentes/BotaoContador";
import { useState } from "react";

function PageContador() {

    const [contador, setContador] = useState(0);

    function aumentarContador() {
        setContador(contador + 10);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.texto}>Contadorr</Text>
            <Text>{contador}</Text>
            <BotaoContador onPress={aumentarContador}>Aumentar Contador</BotaoContador>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default PageContador;