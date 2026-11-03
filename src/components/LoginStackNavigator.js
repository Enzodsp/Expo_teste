import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PageCadastro from "../pages/PageCadastro";
import PageLogin from "../pages/PageLogin";

const Stack = createNativeStackNavigator()

function LoginStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={PageLogin} />
            <Stack.Screen name="Cadastro" component={PageCadastro} />
        </Stack.Navigator>
    )
}

export default LoginStackNavigator