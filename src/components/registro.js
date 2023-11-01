import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native';
import { Button, TextInput, Text, View } from "react-native-web";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseApp from '../../firebaseConfig';
import { useNavigation } from "@react-navigation/native";

const auth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);

function Registro() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [result, setResult] = useState("");
  
    const navigation = useNavigation();

    async function handle(){
        if(pwd !== pwd2) {
            setResult("Las contraseñas no coinciden!!");
            return;
        }

      try { 
        const r = await createUserWithEmailAndPassword(auth, email, pwd);
        
        const uid = r.user.uid;

        const _ = await setDoc(doc(database, "perfil", uid), {username: "", cantAmigos: 0, colorDePelo: ""});

        navigation.navigate("Login")
      } catch (e) {
        setResult("There was an error while creating the user");
      }
    }
  
    return (
      <View style={styles.container}>
        <TextInput placeholder="email" onChangeText={(m) => setEmail(m)}/>
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