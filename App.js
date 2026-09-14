import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import PageInicial from './src/pages/PageInicial';
import PageContador from './src/pages/PageContador';
import PageTarefas from './src/pages/PageTarefas';
import PageReceitas from './src/pages/PageReceitas';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="Receitas">
          <Stack.Screen name="Contador" component={PageContador} />
          <Stack.Screen name="Inicial" component={PageInicial} />
          <Stack.Screen name="Tarefas" component={PageTarefas} />
          <Stack.Screen name="Receitas" component={PageReceitas} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
};

