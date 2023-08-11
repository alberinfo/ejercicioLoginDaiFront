import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native';
import { Button, TextInput, Text, View } from "react-native-web";

function Registro() {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [result, setResult] = useState("");
  
    async function handle(){
        if(pwd !== pwd2) {
            setResult("Las contraseñas no coinciden!!");
            return;
        }

      try { 
        const resp = await axios.post("http://localhost:8080/registro", {
          name: user,
          pwd: pwd
        });
        setResult("OK");
      } catch (e) {
        setResult("joemama");
      }
    }
  
    useEffect(() => {
      console.log("???????", result);
    }, [result])
  
    return (
      <View style={styles.container}>
        <TextInput placeholder="usuario" onChangeText={(username) => setUser(username)}/>
        <TextInput secureTextEntry={true} placeholder="contraseña" onChangeText={(pwd) => setPwd(pwd)} />
        <TextInput secureTextEntry={true} placeholder="confirme su contraseña" onChangeText={(pwd) => setPwd2(pwd)} />
        <Button title="Enviar" onPress={handle}/>
  
        <Text>{result}</Text>
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

export default Registro;