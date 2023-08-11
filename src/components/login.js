import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';


function Login() {
    const navigation = useNavigation();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [result, setResult] = useState("");
  
    async function handle(){
      try { 
        const resp = await axios.post("http://localhost:8080/login", {
          name: user,
          pwd: pwd
        });
        setResult("OK");
      } catch (e) {
        setResult("Usuario o contraseña incorrectas");
      }
    }
  
    useEffect(() => {
      console.log("???????", result);
    }, [result])
  
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