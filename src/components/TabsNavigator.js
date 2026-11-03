import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PageContador from "../pages/PageContador"
import PageTarefas from "../pages/PageTarefas"

const Tabs = createBottomTabNavigator()

function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}>
            <Tabs.Screen name="Contador" component={PageContador}
                options={{
                    tabBarIcon: () => <Ionicons name="calculator" size={24} />
                }}
            />
            <Tabs.Screen name="Tarefas" component={PageTarefas}
                options={{
                    tabBarIcon: () => <Ionicons name="list" size={24} />
                }}
            />
        </Tabs.Navigator>
    )
}

export default TabsNavigator;