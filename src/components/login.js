import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import userContext from '../../context';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../../firebaseConfig';

const auth = getAuth(firebaseApp);

function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [result, setResult] = useState("");

    const context = useContext(userContext);

    async function handle(){
      try { 
        const resp = await signInWithEmailAndPassword(auth, email, pwd);

        context.setUsuario(resp.user);

        navigation.navigate("Home");
      } catch (e) {
        setResult("Usuario o contraseña incorrectas");
      }
    }
  
    return (
      <View style={styles.container}>
        <TextInput placeholder="email" onChangeText={(m) => setEmail(m)}/>
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