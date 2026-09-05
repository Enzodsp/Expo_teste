import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function PageTarefas() {
    const [tarefas, setTarefas] = useState([]);

    async function listarTarefas() {
        response = await fetch("https://dummyjson.com/todos");
        dados = await response.json();
        setTarefas(dados.todos);
    }

    useEffect(() => {
        listarTarefas();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {tarefas.map(tarefa => (
                <Card>
                    <Card.Content>
                        <Text>{tarefa.todo}</Text>
                    </Card.Content>
                </Card>
            ))}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green",
    },
    textColoCard: {
        color: "white",
    }
});

export default PageTarefas;
