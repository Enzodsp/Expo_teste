import { useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Card, Avatar, List, Button, ActivityIndicator, Text, Divider } from "react-native-paper";
import { auth } from "../../firebase-init";
import useAuthService from "../services/useAuthService";

function PagePerfil() {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const { buscarDadosUsuario, deslogarUsuario } = useAuthService();

    const carregarPerfil = useCallback(async () => {
        try {
            setCarregando(true);
            const user = auth.currentUser;
            if (user) {
                const dadosFirestore = await buscarDadosUsuario(user.uid);
                setDados(dadosFirestore);
            }
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarPerfil();
    }, [carregarPerfil]);

    async function handleLogout() {
        Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deslogarUsuario();
                    } catch (error) {
                        Alert.alert("Erro ao sair", error.message);
                    }
                }
            }
        ]);
    }

    if (carregando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" animating={true} />
                <Text style={styles.loadingText}>Carregando dados do perfil...</Text>
            </View>
        );
    }

    const iniciais = dados?.nome
        ? dados.nome.trim().split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
        : "U";

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <View style={styles.avatarContainer}>
                    <Avatar.Text size={72} label={iniciais} />
                    <Text variant="titleLarge" style={styles.userName}>
                        {dados?.nome || auth.currentUser?.displayName || "Usuário"}
                    </Text>
                    <Text variant="bodyMedium" style={styles.userEmail}>
                        {auth.currentUser?.email}
                    </Text>
                </View>

                <Card.Content>
                    <Divider style={styles.divider} />

                    <List.Section title="Informações Pessoais">
                        <List.Item
                            title="Nome Completo"
                            description={dados?.nome || "Não informado"}
                            left={(props) => <List.Icon {...props} icon="account" />}
                        />
                        <List.Item
                            title="E-mail"
                            description={dados?.email || auth.currentUser?.email || "Não informado"}
                            left={(props) => <List.Icon {...props} icon="email" />}
                        />
                        <List.Item
                            title="Telefone"
                            description={dados?.telefone || "Não informado"}
                            left={(props) => <List.Icon {...props} icon="phone" />}
                        />
                        <List.Item
                            title="ID do Usuário (UID)"
                            description={auth.currentUser?.uid || "N/A"}
                            left={(props) => <List.Icon {...props} icon="identifier" />}
                        />
                        <List.Item
                            title="Status do E-mail"
                            description={auth.currentUser?.emailVerified ? "Verificado ✅" : "Pendente ⚠️"}
                            left={(props) => <List.Icon {...props} icon="check-decagram" />}
                        />
                    </List.Section>

                    <Button
                        mode="outlined"
                        icon="refresh"
                        onPress={carregarPerfil}
                        style={styles.refreshButton}
                    >
                        Atualizar Dados
                    </Button>

                    <Button
                        mode="contained-tonal"
                        icon="logout"
                        buttonColor="#ffdddd"
                        textColor="#b00020"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    >
                        Desconectar da Conta
                    </Button>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
    },
    card: {
        paddingVertical: 12,
    },
    avatarContainer: {
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 8,
    },
    userName: {
        marginTop: 12,
        fontWeight: "bold",
    },
    userEmail: {
        color: "#666",
        marginTop: 2,
    },
    divider: {
        marginVertical: 12,
    },
    refreshButton: {
        marginTop: 12,
    },
    logoutButton: {
        marginTop: 12,
    }
});

export default PagePerfil;
