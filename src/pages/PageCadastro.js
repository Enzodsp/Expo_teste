import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import useAuthService from "../services/useAuthService";
import { useNavigation } from "@react-navigation/native";

function PageCadastro() {
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: ''
    });
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();

    async function cadastrarUsuario() {
        if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.telefone) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            setLoading(true);
            await cadastrarEmailSenha(usuario);
            Alert.alert(
                "Cadastro Realizado!",
                "Um e-mail de verificação foi enviado. Por favor, confirme seu e-mail antes de realizar o login.",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            );
        } catch (err) {
            console.error(err);
            let mensagem = "Erro ao cadastrar, tente novamente mais tarde.";
            if (err.code === "auth/email-already-in-use") {
                mensagem = "Este e-mail já está cadastrado.";
            } else if (err.code === "auth/weak-password") {
                mensagem = "A senha deve conter pelo menos 6 caracteres.";
            } else if (err.code === "auth/invalid-email") {
                mensagem = "Formato de e-mail inválido.";
            }
            Alert.alert("Erro no Cadastro", mensagem);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Criar Nova Conta" subtitle="Preencha seus dados para começar" />
                <Card.Content>
                    <TextInput
                        label="Nome Completo *"
                        placeholder="Insira seu nome completo"
                        value={usuario.nome}
                        onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="E-mail *"
                        placeholder="seuemail@exemplo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={usuario.email}
                        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Telefone *"
                        placeholder="(44) 99999-9999"
                        keyboardType="phone-pad"
                        value={usuario.telefone}
                        onChangeText={(text) => setUsuario({ ...usuario, telefone: text })}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Senha *"
                        placeholder="Mínimo 6 caracteres"
                        value={usuario.senha}
                        secureTextEntry={secureText}
                        onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
                        style={styles.input}
                        mode="outlined"
                        right={
                            <TextInput.Icon
                                icon={secureText ? "eye-off" : "eye"}
                                onPress={() => setSecureText(!secureText)}
                            />
                        }
                    />
                    <Button
                        mode="contained"
                        loading={loading}
                        disabled={loading}
                        onPress={cadastrarUsuario}
                        style={styles.button}
                    >
                        Cadastrar
                    </Button>
                    <Text style={styles.textBottom}>Já possui uma conta?</Text>
                    <Button
                        mode="text"
                        onPress={() => navigation.navigate("Login")}
                    >
                        Fazer Login
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
        justifyContent: 'center',
    },
    card: {
        paddingVertical: 8,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 8,
        marginBottom: 16,
    },
    textBottom: {
        textAlign: 'center',
        marginTop: 8,
    }
});

export default PageCadastro;
