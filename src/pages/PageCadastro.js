import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Card, Text, TextInput, Divider } from "react-native-paper";
import { useState } from "react";
import useAuthService from "../services/useAuthService";
import { useNavigation } from "@react-navigation/native";
import Usuario from "../models/Usuario";
import { Endereco } from "../models/Endereco";

function PageCadastro() {
    const [usuario, setUsuario] = useState(new Usuario());
    const [endereco, setEndereco] = useState(new Endereco());
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();

    function handleOnChangeTextUsuario(campo, texto) {
        const novoUsuario = new Usuario({
            ...usuario,
            [campo]: texto
        });
        setUsuario(novoUsuario);
    }

    function handleOnChangeTextEndereco(campo, texto) {
        const novoEndereco = new Endereco({
            ...endereco,
            [campo]: texto
        });
        setEndereco(novoEndereco);
    }

    async function cadastrarUsuario() {
        if (!usuario.getNome() || !usuario.getEmail() || !usuario.getSenha() || !usuario.getTelefone()) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios (*).");
            return;
        }

        try {
            setLoading(true);
            const usuarioCompleto = new Usuario({
                ...usuario,
                endereco: endereco
            });
            await cadastrarEmailSenha(usuarioCompleto);
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
                        value={usuario.getNome()}
                        onChangeText={(text) => handleOnChangeTextUsuario("nome", text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="E-mail *"
                        placeholder="seuemail@exemplo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={usuario.getEmail()}
                        onChangeText={(text) => handleOnChangeTextUsuario("email", text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Telefone *"
                        placeholder="(44) 99999-9999"
                        keyboardType="phone-pad"
                        value={usuario.getTelefone()}
                        onChangeText={(text) => handleOnChangeTextUsuario("telefone", text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Senha *"
                        placeholder="Mínimo 6 caracteres"
                        value={usuario.getSenha()}
                        secureTextEntry={secureText}
                        onChangeText={(text) => handleOnChangeTextUsuario("senha", text)}
                        style={styles.input}
                        mode="outlined"
                        right={
                            <TextInput.Icon
                                icon={secureText ? "eye-off" : "eye"}
                                onPress={() => setSecureText(!secureText)}
                            />
                        }
                    />

                    <Divider style={styles.divider} />
                    <Text variant="titleSmall" style={styles.sectionTitle}>Endereço (opcional)</Text>

                    <TextInput
                        label="CEP"
                        placeholder="00000-000"
                        keyboardType="numeric"
                        value={endereco.getCep() || ""}
                        onChangeText={(text) => handleOnChangeTextEndereco("cep", text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Logradouro"
                        placeholder="Rua, Avenida, etc."
                        value={endereco.getLogradouro() || ""}
                        onChangeText={(text) => handleOnChangeTextEndereco("logradouro", text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Número"
                        placeholder="Ex: 123"
                        keyboardType="numeric"
                        value={endereco.getNumero() || ""}
                        onChangeText={(text) => handleOnChangeTextEndereco("numero", text)}
                        style={styles.input}
                        mode="outlined"
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
    divider: {
        marginVertical: 12,
    },
    sectionTitle: {
        marginBottom: 12,
        fontWeight: 'bold',
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
