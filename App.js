import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/login';
import Registro from './src/components/registro';
import Home from './src/components/Home';
import { createContext, useState } from 'react';
import userContext from './context';

const Stack = createNativeStackNavigator();

export default function App() {

  const [usuario, setUsuario] = useState({});
  const [perfil, setPerfil] = useState({});

  return(
    <NavigationContainer>
      <userContext.Provider value={{usuario, setUsuario, perfil, setPerfil}}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Registro" component={Registro}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </userContext.Provider>
    </NavigationContainer>
  )
}