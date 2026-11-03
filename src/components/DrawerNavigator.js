import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import PagePerfil from "../pages/PagePerfil";
import PageWebView from "../pages/PageWebView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase-init";
import { signOut } from "firebase/auth";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator();

function DrawerNavigator(drawerProps) {

    async function handleLogout() {
        Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                    try {
                        if (drawerProps?.deslogar) {
                            await drawerProps.deslogar();
                        } else {
                            await signOut(auth);
                        }
                    } catch (error) {
                        Alert.alert("Erro ao sair", error.message);
                    }
                }
            }
        ]);
    }

    function DrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Sair"
                    icon={() => <MaterialIcons name="logout" size={24} color="#b00020" />}
                    onPress={handleLogout}
                    labelStyle={{ color: '#b00020', fontWeight: 'bold' }}
                />
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator
            drawerContent={(navProps) => <DrawerContent {...navProps} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#0066cc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Drawer.Screen
                name="Início"
                component={StackNavigator}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size || 24} color={color} />
                }}
            />
            {/* Desafio 2 do Roteiro Aula Prática 3: Tela PagePerfil acessível pelo Drawer */}
            <Drawer.Screen
                name="Meu Perfil"
                component={PagePerfil}
                options={{
                    title: "Perfil do Usuário",
                    drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size || 24} color={color} />
                }}
            />
            {/* Atividade de Segurança com WebViews: Rota no Drawer renderizando as WebViews */}
            <Drawer.Screen
                name="Navegador Seguro"
                component={PageWebView}
                options={{
                    title: "WebViews Seguras",
                    drawerIcon: ({ color, size }) => <Ionicons name="globe-outline" size={size || 24} color={color} />
                }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
