import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import userContext from '../../context';

function Login() {
    const navigation = useNavigation();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [result, setResult] = useState("");

    const context = useContext(userContext);

    async function handle(){
      try { 
        const resp = await axios.post("http://localhost:8080/login", {
          name: user,
          pwd: pwd
        });

        console.log(resp);

        context.setUsuario({name: user, sessionId: resp.data});

        navigation.navigate("Home");
      } catch (e) {
        setResult("Usuario o contraseña incorrectas");
      }
    }
  
    return (
      <View style={styles.container}>
        <TextInput placeholder="usuario" onChangeText={(username) => setUser(username)}/>
        <TextInput secureTextEntry={true} placeholder="contraseña" onChangeText={(pwd) => setPwd(pwd)} />
        <Button title="Enviar" onPress={handle}/>
  
        <Text>{result}</Text>
        <Button onPress={() => navigation.navigate("Registro")} title="no tengo cuenta"/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Login;