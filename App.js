import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';

export default function App() {
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
      <Button title="no tengo cuenta"/>
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
