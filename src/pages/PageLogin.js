import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Text, TextInput, Card } from "react-native-paper";
import useAuthService from "../services/useAuthService";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function PageLogin() {
    const [usuario, setUsuario] = useState({
        email: '',
        senha: ''
    });
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingReset, setLoadingReset] = useState(false);
    const { loginEmailSenha, recuperarSenha } = useAuthService();
    const navigation = useNavigation();

    async function logarUsuario() {
        if (!usuario.email || !usuario.senha) {
            Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
            return;
        }

        try {
            setLoading(true);
            await loginEmailSenha(usuario);
            // Ao logar com sucesso e e-mail verificado, o onAuthStateChanged no App.js redirecionará automaticamente
        } catch (err) {
            console.error(err);
            let mensagem = "Erro ao fazer login. Verifique suas credenciais.";
            if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
                mensagem = "E-mail ou senha inválidos.";
            } else if (err.code === "auth/unverified-email" || err.message?.includes("verifique seu e-mail")) {
                mensagem = err.message;
            } else if (err.code === "auth/invalid-email") {
                mensagem = "Formato de e-mail inválido.";
            }
            Alert.alert("Erro de Autenticação", mensagem);
        } finally {
            setLoading(false);
        }
    }

    async function recuperarSenhaUsuario() {
        if (!usuario.email) {
            Alert.alert("Recuperar Senha", "Informe seu e-mail no campo acima para receber as instruções de recuperação.");
            return;
        }

        try {
            setLoadingReset(true);
            await recuperarSenha(usuario);
            Alert.alert("Sucesso", "Um e-mail de redefinição de senha foi enviado para " + usuario.email);
        } catch (err) {
            console.error(err);
            let msg = "Não foi possível enviar o e-mail de recuperação.";
            if (err.code === "auth/user-not-found") {
                msg = "Usuário não encontrado com este e-mail.";
            }
            Alert.alert("Erro", msg);
        } finally {
            setLoadingReset(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Acesso ao Sistema" subtitle="Entre com suas credenciais do Firebase" />
                <Card.Content>
                    <TextInput
                        label="E-mail"
                        placeholder="seuemail@exemplo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={usuario.email}
                        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Senha"
                        placeholder="Insira a sua senha"
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
                        disabled={loading || loadingReset}
                        onPress={logarUsuario}
                        style={styles.button}
                    >
                        Entrar
                    </Button>

                    <Button
                        mode="text"
                        loading={loadingReset}
                        disabled={loading || loadingReset}
                        onPress={recuperarSenhaUsuario}
                    >
                        Esqueceu a senha?
                    </Button>

                    <Text style={styles.textBottom}>Não tem cadastro?</Text>
                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate("Cadastro")}
                        style={styles.btnCadastro}
                    >
                        Cadastre-se
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
        marginBottom: 8,
    },
    textBottom: {
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    btnCadastro: {
        marginTop: 4,
    }
});

export default PageLogin;
