import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Text, ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function PageReceitas({ navigation }) {
    const [carregando, setCarregando] = useState(false);
    const [receitas, setReceitas] = useState([]);

    async function listarReceitas() {
        setCarregando(true);
        try {
            const response = await fetch("https://dummyjson.com/recipes");
            const dados = await response.json();
            setReceitas(dados.recipes);
        } catch (err) {
            alert("Erro ao listar Receitas!");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        listarReceitas();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {carregando == true ? (
                <ActivityIndicator animating={true} size="large" color="#ffffff" style={styles.loader} />
            ) : (
                <FlatList
                    data={receitas}
                    keyExtractor={(receita) => String(receita.id)}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Title title={item.name} subtitle={item.cuisine} />
                            <Card.Content>
                                <Text variant="bodyMedium">Dificuldade: {item.difficulty}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={carregando}
                            onRefresh={listarReceitas}
                        />
                    }
                />
            )}
            <Button onPress={() => navigation.navigate("Contador")}> Contador </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0b2b2",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        padding: 16,
        gap: 12,
    },
    card: {
        backgroundColor: "#ffffff",
    },
});

export default PageReceitas;