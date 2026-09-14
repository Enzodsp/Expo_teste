import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function PageTarefas() {

    const [carregando, setCarregando] = useState(false);
    const [tarefas, setTarefas] = useState([]);

    async function listarTarefas() {
        setCarregando(true);
        fetch("https://dummyjson.com/todos").then(response => {
            response.json().then(dados => {
                setTimeout(() => {
                    setTarefas(dados.todos)
                    setCarregando(false)
                }, 3000);
            })
        }).catch(err => {
            setCarregando(false)
            alert("Erro ao listar tarefas!")
        })
    }

    useEffect(() => {
        listarTarefas();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {carregando == true ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
                <FlatList
                    data={tarefas}
                    keyExtractor={(tarefa) => tarefa.id}
                    renderItem={({ item }) => (
                        <Card key={item.id}>
                            <Card.Content>
                                <Text>{item.todo}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={carregando}
                            onRefresh={listarTarefas}
                        />
                    }
                />
            )}
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
