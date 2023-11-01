import { useContext, useState } from "react";
import { Button, TextInput, View } from "react-native-web";
import userContext from '../../context';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import firebaseApp from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const database = getFirestore(firebaseApp);

export default function FormPerfil() {
    const navigation = useNavigation();

    const context = useContext(userContext);

    const [username, setUsername] = useState();
    const [pelo, setPelo] = useState();
    const [amigos, setAmigos] = useState();

    async function handle() {
        try {
            const resp = await updateDoc(doc(database, "perfil", context.usuario.uid), {username, colorDePelo: pelo, cantAmigos: amigos});

            context.setReload(true);

            navigation.navigate("Home");
        } catch (err) {
            return err;
        }
    }

    return (
        <View>
            <h1>Ingresa los datos de tu perfil!</h1>
            <br/>
            <TextInput placeholder="Tu nombre de usuario" onChangeText={(uname) => setUsername(uname)}/>
            <TextInput placeholder="Tu color de pelo" onChangeText={(pelo) => setPelo(pelo)}/>
            <TextInput placeholder="Cuantos amigos tenes?" onChangeText={(amigos) => setAmigos(amigos)} />
            <Button title="Enviar" onPress={handle}/>
        </View>
    )
}